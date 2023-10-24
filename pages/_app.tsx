import {getClientList, getFeaturesListPromise, getFeaturesPerClient} from "../api/DashboardAPI";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import type {AppProps} from "next/app";

// import typescript Interfaces
import {Client, Feature} from "../types/api.types";
import {FeatSelectedStatus} from "../types/componentProps.types";
import useUpdateEffect from "../utils/customHooks";
import {logger} from "../logger";

/**
 * check if features status has been selected in combobox.
 * If so, returns the features array filtered per status. If not, return the features array without any modification.
 * @param {Array<Feature>} featuresPerClient
 * @param {string} featureStatus
 * @return {Array<Feature>}
 */
function showFeaturesPerStatus(featuresPerClient:Array<Feature>, featureStatus:FeatSelectedStatus) {
    switch (featureStatus) {
    case FeatSelectedStatus.ACTIVE:
        return featuresPerClient.filter(
            (feat:Feature) => {
                return Object.values(feat.status).includes("ENABLED") ||
                   Object.values(feat.status).includes("ENABLED_AND_DISABLED");
            }
        );
    case FeatSelectedStatus.INACTIVE:
        return featuresPerClient.filter(
            (feat:Feature) => {
                /* Object.values(feat) returns an array with feature name and  */
                return (Object.values(feat.status).includes("DISABLED") ||
                    Object.values(feat.status).includes("ENABLED_AND_DISABLED") ||
                    Object.values(feat.status).slice(1).every((value) => value === "NONE"));
            }
        );
    case FeatSelectedStatus.ALL:
        return featuresPerClient;
    default:
        return featuresPerClient;
    }
}

/**
 *
 * @constructor
 */
function TemplatePage({Component, pageProps}: AppProps) {
    const [clients, setClients] = useState<Array<Client>>([]);
    const [featureList, setFeatureList] = useState<Array<Feature>>([]);
    const router = useRouter();

    // we get the two query string properties from URL (filtered clients and filtered features)
    const {["fltr-clients"]: fltrClients, ["fltr-features"]: fltrFeatures} = router.query;

    // contains the list of clients that have been selected by the user
    const [filteredClients, setFilteredClients] = useState<Array<Client>>([]);

    // contains the list of features that have been selected by the user
    const [filteredFeatures, setFilteredFeatures] = useState<Array<Feature>>([]);

    /* contains the current selected status of the features to show
    (keine Auswahl, aktiviert, deaktiviert / nicht konfiguriert) */
    const [featureStatus, setFeatureStatus] = useState<FeatSelectedStatus>(FeatSelectedStatus.ALL);

    const [clientsLoading, setClientsLoading] = useState(true);
    const [filtersAreLoaded, setFiltersAreLoaded] = useState(false);

    /**
     * showSelectedFeatures
     * it shows the Features that have been selected by the user
     * (e.g. checks if "traffective" and "aktiviert" have been selected and shows the result)
     * @param {Array<Feature>} featuresPerClient
     * @param {boolean} showUniversalFeatures
     * @return {Array<Feature>}
     */
    function showSelectedFeatures(featuresPerClient: Array<Feature>, showUniversalFeatures?: boolean) {
        const universalFeatures = ["header", "footer"];
        let featuresFilteredPerStatus = showFeaturesPerStatus(featuresPerClient, featureStatus);

        // first of all, we check if the feature list belongs to Allgemein (universal) or Features
        if (showUniversalFeatures) {
            featuresFilteredPerStatus = featuresFilteredPerStatus
                .filter((feat) => universalFeatures.includes(feat.key));
        } else {
            featuresFilteredPerStatus = featuresFilteredPerStatus
                .filter((feat) => !universalFeatures.includes(feat.key));
        }

        // if one or more features have been selected in the combobox...
        if (filteredFeatures.length > 0) {
            return (
                /* we return the features that pass the following criteria:
                1) they have been filtered through showFeaturesPerStatus
                in order to show them according to the selected status (active, inactive or all)
                2) are also present in filteredFeatures array. */
                featuresFilteredPerStatus.filter((feat: Feature) =>
                    // for each feature we check if it is present in filteredFeatures array
                    filteredFeatures.some((filteredFeat) => filteredFeat.id === feat.id)
                )
            );
            // if there is no feature in filteredFeatures, we show them according to point 1)
        } else return featuresFilteredPerStatus;
    }

    /**
     * getStateWithHasFeaturesProp
     * @param {Array<Client>} clients
     * @return {Array<Client>}
     */
    function getStateWithHasFeaturesProp(clients:Array<Client>) {
        return clients.map<Client>((client: Client) => {
            return {
                ...client,
                hasFeatures: showSelectedFeatures(client.features).length > 0 ||
                    showSelectedFeatures(client.features, true).length > 0,
            } as Client;
        });
    }

    /* The code inside this useEffect is called only once, the first time that the Home component is loaded.
    This is the moment when we want to get the clients list from APIs and set the clients status with its value. */
    useEffect(() => {
        getClientList()
            .then((data) => {
            // update the returned data array adding hasFeatures prop to each element of it
                const clientsWithHasFeaturesPromise:Promise<Client>[] = data.map<Promise<Client>>((client: Client) => {
                    const promiseFeatures:Promise<Feature[]> = getFeaturesPerClient(client.id);
                    return promiseFeatures
                        .then((featuresData:Feature[]): Client => {
                        // if there are Features, add them to the client state...
                            return {
                                ...client,
                                features: featuresData,
                                hasFeatures: true,
                            } as Client;
                        })
                    // ...otherwise return the client itself
                        .catch((error: Error): Client => {
                            console.log(error);
                            return client;
                        });
                });

                // Wait until all the pending promises are resolved, then update the state
                const promises:Promise<Client[]> = Promise.all(clientsWithHasFeaturesPromise);

                promises
                    .then((clientsWithHasFeatures:Array<Client>) => {
                        // update clients state with the new value
                        setClients(clientsWithHasFeatures);
                        setClientsLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                logger.error("Could not get a client list", error);
                return [];
            });

        // set Feature List state in order to use it throughout the project
        getFeaturesListPromise()
            .then((data:Feature[]) => {
                setFeatureList(data);
            })
            .catch((error) => {
                logger.error("Could not get the Feature List", error);
            });
    }, []);

    useUpdateEffect(() => {
        // if filtered clients are present in the url, set the filteredClients state
        if (fltrClients?.length) {
            const filteredClients = clients.filter(
                (client) => fltrClients.includes(String(client.id))
            );
            setFilteredClients(filteredClients);
        }

        // if filtered features are present in the url, set the filteredFeatures state
        if (fltrFeatures?.length) {
            const featuresPromise:Promise<Feature[]> = getFeaturesListPromise();

            featuresPromise
                .then((data:Feature[]) => {
                    const filteredFeature = data.filter((feature) => fltrFeatures.includes(feature.name));
                    setFilteredFeatures(filteredFeature);
                })
                .catch((error) => {
                    console.log(error);
                    return [];
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientsLoading]);

    // The code inside this useEffect is called everytime there is a change in featureStatus or filteredFeatures state
    useEffect(() => {
        /* here we set the status of property hasFeatures for each client.
        hasFeatures is a boolean that tell us if a client has features to show according to the current set filters.
        If there are no features, we set hasFeatures to false.
        This property is currently used in MainContent and IDComboSelect.
        Every time there is a change in featureStatus or filteredFeatures state we update also hasFeatures value */

        // if clients state is not empty...
        if (clients.length) {
            /* set hasFeatures status for client list */
            setClients(getStateWithHasFeaturesProp(clients));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featureStatus, filteredFeatures]);

    /* The code inside this custom Hook useUpdateEffect is called everytime there is a change in filteredClients state
    but not the first time the component is rendered, like it happens for a normal useEffect
    Docu: https://usehooks-ts.com/react-hook/use-update-effect */
    useUpdateEffect(() => {
        // we create an array with all Ids of selected clients
        const filteredClientIds = filteredClients.map<number>((client) => client.id);
        // we create an array with all names of selected features
        const filteredFeatureNames = filteredFeatures.map<string>((feature) => feature.name);

        /* we update the url, according to the app state, if one of these conditions is true:
        1. filtersAreLoaded is true. This means that either filteredClients or filteredFeatures
        have been called at least once
        2. the url contains no parameters (router.query is empty). This means that
        we are not in the case of a shared url with filters already present in the query parameters.
         */
        if (filtersAreLoaded || Object.keys(router.query).length === 0) {
            router.push({
                query: {
                    ...(filteredClientIds.length && {"fltr-clients": filteredClientIds}),
                    ...(filteredFeatureNames.length && {"fltr-features": filteredFeatureNames}),
                },
            });
        }

        setFiltersAreLoaded(true);
    }, [filteredClients, filteredFeatures]);

    return (
        <Component {...pageProps}
            clients={clients}
            featureList={featureList}
            filteredClients={filteredClients}
            filteredFeatures={filteredFeatures}
            setFilteredClients={setFilteredClients}
            setFilteredFeatures={setFilteredFeatures}
            showSelectedFeatures={showSelectedFeatures}
            setFeatureStatus={setFeatureStatus}
            isLoading={clientsLoading}
        />
    );
}

export default TemplatePage;

/* start-test-block */
export {
    showFeaturesPerStatus,
};
/* end-test-block */
