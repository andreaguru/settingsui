import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "types/context.types";
import { FeatSelectedStatus } from "types/componentProps.types";
import { Client, Feature } from "types/api.types";
import { useRouter } from "next/router";
import { useClientList, useFeaturesList } from "services/DashboardAPI";
import { useUpdateEffect } from "utils/customHooks";
import logger from "../logger";

/**
 * The AppContext variable represents a React context object that provides a global state and functionality to
 * the components in the application.
 *
 * @type {React.Context<GlobalContext>}
 * @property {Function} setClientIdInView - A function to set the client ID in view.
 * @property {Array} clients - An array of client objects.
 * @property {Function} setClients - A function to update the clients array.
 * @property {Array} filteredClients - An array of client objects after applying filters.
 * @property {Function} setFilteredClients - A function to update the filteredClients array.
 * @property {Array} featureList - An array of feature objects.
 * @property {Array} filteredFeatures - An array of feature objects after applying filters.
 * @property {Function} setFilteredFeatures - A function to update the filteredFeatures array.
 * @property {Function} showSelectedFeatures - A function to show the selected features.
 * @property {boolean} clientsLoading - A boolean value indicating if the clients are still loading.
 */
const AppContext = createContext<GlobalContext>({
    setClientIdInView: () => {
        // Function initially empty
    },
    clients: [],
    setClients: () => {
        // Function initially empty
    },
    filteredClients: [],
    setFilteredClients: () => {
        // Function initially empty
    },
    featureList: [],
    filteredFeatures: [],
    setFilteredFeatures: () => {
        // Function initially empty
    },
    showSelectedFeatures: () => [],
    clientsLoading: true,
    userData: {},
    setUserData: () => {
        // Function initially empty
    },
});

/**
 * check if features status has been selected in combobox.
 * If so, returns the features array filtered per status.
 * If not, return the features array without any modification.
 * @param {Array<Feature>} featuresPerClient
 * @param {string} featureStatus
 * @return {Array<Feature>}
 */
function showFeaturesPerStatus(
    featuresPerClient: Feature[],
    featureStatus: FeatSelectedStatus,
): Feature[] {
    switch (featureStatus) {
        case FeatSelectedStatus.ACTIVE:
            return featuresPerClient
                .filter((feat: Feature) => Object.values(feat.status).includes("ENABLED") ||
                    Object.values(feat.status).includes("ENABLED_AND_DISABLED"));
        case FeatSelectedStatus.INACTIVE:
            return featuresPerClient
                .filter((feat: Feature) => Object.values(feat.status).includes("DISABLED") ||
                    Object.values(feat.status).includes("ENABLED_AND_DISABLED") ||
                    Object.values(feat.status)
                        .slice(1)
                        .every(value => value === "NONE"));
        case FeatSelectedStatus.ALL:
            return featuresPerClient;
        default:
            return featuresPerClient;
    }
}

function AppContextProvider({ children }: { children: ReactNode }) {
    const [clients, setClients] = useState<Client[]>([]);
    const [featureList, setFeatureList] = useState<Feature[]>([]);
    const [clientIdInView, setClientIdInView] = useState<number>();
    const router = useRouter();

    // we get the two query string properties from URL (filtered clients and filtered features)
    const { "fltr-clients": fltrClients, "fltr-features": fltrFeatures } = router.query;

    // contains the list of clients that have been selected by the user
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);

    // contains the list of features that have been selected by the user
    const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);

    /* contains the current selected status of the features to show
        (keine Auswahl, aktiviert, deaktiviert / nicht konfiguriert) */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [featureStatus, setFeatureStatus] = useState<FeatSelectedStatus>(FeatSelectedStatus.ALL);

    const [clientsLoading, setClientsLoading] = useState(true);
    const [filtersAreLoaded, setFiltersAreLoaded] = useState(false);
    const [userData, setUserData] = useState({});

    const clientsFetch = useClientList();
    const featuresListFetch = useFeaturesList();

    useEffect(() => {
        if (clientsFetch && clientsFetch.length > 0 && clientsLoading) {
            setClients(clientsFetch);
            setClientsLoading(false);
        }
    }, [clientsFetch, clientsLoading]);

    useEffect(() => {
        if (featuresListFetch && featuresListFetch.length > 0) {
            // update the returned data array adding empty features array
            setFeatureList(featuresListFetch);
        }
    }, [featuresListFetch]);

    /**
     * showSelectedFeatures
     * it shows the Features that have been selected by the user
     * (e.g. checks if "traffective" and "aktiviert" have been selected and shows the result)
     * @param {Array<Feature>} featuresPerClient
     * @param {boolean} showUniversalFeatures
     * @return {Array<Feature>}
     */
    const showSelectedFeatures = useCallback(
        (featuresPerClient: Feature[], showUniversalFeatures?: boolean): Feature[] => {
            const universalFeatures = new Set(["header", "footer"]); // Use Set for O(1) lookups
            const filteredFeatureIds = new Set(filteredFeatures.map(f => f.id)); // Pre-compute for efficiency

            let result = showFeaturesPerStatus(featuresPerClient, featureStatus);

            // Filter universal vs regular features
            result = showUniversalFeatures ?
                result.filter(feat => universalFeatures.has(feat.key)) :
                result.filter(feat => !universalFeatures.has(feat.key));

            // Apply feature filtering if any features are selected
            if (filteredFeatures.length > 0) {
                result = result.filter(feat => filteredFeatureIds.has(feat.id));
            }

            return result;
        },
        [featureStatus, filteredFeatures],
    );

    useUpdateEffect(() => {
        // if filtered clients are present in the url,
        // and no filteredClients has been set, set the filteredClients state
        if (fltrClients?.length && !filteredClients.length && !clientsLoading) {
            const filtClients = clients.filter(client => fltrClients.includes(String(client.id)));
            setFilteredClients(filtClients);
        }
    }, [clientsLoading, router]);

    useUpdateEffect(() => {
        // if filtered features are present in the url,
        // and no filteredFeatures has been set, set the filteredFeatures state
        if (fltrFeatures?.length && !filteredFeatures.length && featuresListFetch.length > 0) {
            const filteredFeature = featuresListFetch.filter(feature => fltrFeatures.includes(feature.name));
            setFilteredFeatures(filteredFeature);
        }
    }, [featuresListFetch, router]);

    /* The code inside this custom Hook useUpdateEffect
    is called everytime there is a change in filteredClients state
        but not the first time the component is rendered, like it happens for a normal useEffect
        Docu: https://usehooks-ts.com/react-hook/use-update-effect */
    useUpdateEffect(() => {
        // we create an array with all Ids of selected clients
        const filteredClientIds = filteredClients.map<number>(client => client.id);
        // we create an array with all names of selected features
        const filteredFeatureNames = filteredFeatures.map<string>(feature => feature.name);

        /* we update the url, according to the app state, if one of these conditions is true:
                1. filtersAreLoaded is true. This means that either filteredClients or filteredFeatures
                have been called at least once
                2. the url contains no parameters (router.query is empty). This means that
                we are not in the case of a shared url with filters already present in the query parameters.
                 */
        if (filtersAreLoaded || Object.keys(router.query).length === 0) {
            router.push({
                query: {
                    ...(filteredClientIds.length && {
                        "fltr-clients": filteredClientIds,
                    }),
                    ...(filteredFeatureNames.length && {
                        "fltr-features": filteredFeatureNames,
                    }),
                },
            })
                .catch(error => {
                    logger.error(error, "Navigation failed:");
                });
        }
        setFiltersAreLoaded(true);
    }, [filteredClients, filteredFeatures]);

    // Create an object that contains all the values and functions that we want to pass to the app context
    // useMemo avoid re-creating the object every time the component re-renders
    const appContext = useMemo(
        () => ({
            clientIdInView,
            setClientIdInView,
            clients,
            setClients,
            filteredClients,
            setFilteredClients: setFilteredClients,
            featureList,
            filteredFeatures,
            setFilteredFeatures: setFilteredFeatures,
            showSelectedFeatures,
            clientsLoading,
            userData,
            setUserData,
        }),
        [
            clientIdInView,
            clients,
            filteredClients,
            featureList,
            filteredFeatures,
            showSelectedFeatures,
            clientsLoading,
            userData,
        ],
    );

    return <AppContext value={appContext}>{children}</AppContext>;
}

export { AppContext, AppContextProvider };

/* start-test-block */
export { showFeaturesPerStatus };
/* end-test-block */
