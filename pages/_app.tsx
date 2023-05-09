import {getClientList} from "../api/DashboardAPI";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import type {AppProps} from "next/app";

// import typescript Interfaces
import {Client, Feature} from "../types/api.types";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {FeatureLabelMap} from "../api/FeatureLabelMap";
import useUpdateEffect from "../utils/customHooks";
import {getFeaturesList} from "../utils/utils";

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
                return Object.values(feat).includes("ENABLED") ||
                   Object.values(feat).includes("ENABLED_AND_DISABLED");
            }
        );
    case FeatSelectedStatus.INACTIVE:
        return featuresPerClient.filter(
            (feat:Feature) => {
                /* Object.values(feat) returns an array with feature name and  */
                return (Object.values(feat).includes("DISABLED") ||
                    Object.values(feat).includes("ENABLED_AND_DISABLED") ||
                    Object.values(feat).slice(1).every((value) => value === "NONE"));
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
function TemplatePage({Component, pageProps}:AppProps) {
    const [clients, setClients] = useState<Array<Client>>([]);
    const router = useRouter();

    // we get the two query string properties from URL (filtered clients and filtered features)
    const {fltrClients, fltrFeatures} = router.query;

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
     * @return {Array<Feature>}
     */
    function showSelectedFeatures(featuresPerClient:Array<Feature>) {
        const featuresFilteredPerStatus = showFeaturesPerStatus(featuresPerClient, featureStatus);

        // if one or more features have been selected in the combobox...
        if (filteredFeatures.length > 0) {
            return (
                /* we return the features that pass the following criteria:
                1) they have been filtered through showFeaturesPerStatus
                in order to show them according to the selected status (active, inactive or all)
                2) are also present in filteredFeatures array. */
                featuresFilteredPerStatus.filter((feat:Feature) =>
                    // for each feature we check if it is present in filteredFeatures array
                    filteredFeatures.some((filteredFeat) => filteredFeat.name === feat.name)
                )
            );
            // if there is no feature in filteredFeatures, we show them according to point 1)
        } else return featuresFilteredPerStatus;
    }

    /**
 * addFeatureLabel
 * @param {Array<Feature>} features
 * @return {Array<Feature>}
 */
    function addFeatureLabel(features:Array<Feature>) {
        return features.map((feat) => {
            const featureInLabelMap = FeatureLabelMap.find((feature) => feature.name == feat.name);

            return {
                ...feat,
                label: featureInLabelMap ? featureInLabelMap.label : "",
            };
        });
    }

    /**
     * getStateWithHasFeaturesProp
     * @param {Array<Client>} clients
     * @return {Array<Client>}
     */
    function getStateWithHasFeaturesProp(clients:Array<Client>) {
        return clients.map((client: Client):Client => {
            return {
                ...client,
                hasFeatures: showSelectedFeatures(client.features).length > 0,
            };
        });
    }

    /* The code inside this useEffect is called only once, the first time that the Home component is loaded.
    This is the moment when we want to get the clients list from APIs and set the clients status with its value. */
    useEffect(() => {
        const data = getClientList();
        data.then((data) => {
            if (data && data.length) {
                // update the returned data array adding hasFeatures prop to each element of it
                const clientsWithHasFeaturesProperty:Array<Client> = data.map((client:Client):Client => {
                    return {
                        ...client,
                        features: addFeatureLabel(client.features),
                        hasFeatures: true};
                });
                // update clients state with the new value
                setClients(clientsWithHasFeaturesProperty);
                setClientsLoading(false);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useUpdateEffect(() => {
        // if filtered clients are present in the url, set the filteredClients state
        if (fltrClients?.length) {
            const filteredClients = clients.filter(
                (client) => fltrClients.includes(client.name)
            );
            setFilteredClients(filteredClients);
        }

        // if filtered features are present in the url, set the filteredFeatures state
        if (fltrFeatures?.length) {
            const filteredFeatures = getFeaturesList(clients).filter(
                (feature) => fltrFeatures.includes(feature.name)
            );
            setFilteredFeatures(filteredFeatures);
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
        // we create an array with all names of selected clients
        const filteredClientNames = filteredClients.map((a) => a.name);
        // we create an array with all names of selected clients
        const filteredFeatureNames = filteredFeatures.map((a) => a.name);

        /* we update the url, according to the app state, if one of these conditions is true:
        1. filtersAreLoaded is true. This means that either filteredClients or filteredFeatures
        have been called at least once
        2. the url contains no parameters (router.query is empty). This means that
        we are not in the case of a shared url with filters already present in the query parameters.
         */
        if (filtersAreLoaded || Object.keys(router.query).length === 0) {
            router.push({
                query: {
                    ...(filteredClientNames.length && {fltrClients: JSON.stringify(filteredClientNames)}),
                    ...(filteredFeatureNames.length && {fltrFeatures: JSON.stringify(filteredFeatureNames)}),
                },
            });
        }

        setFiltersAreLoaded(true);
    }, [filteredClients, filteredFeatures]);

    return (
        <Component {...pageProps}
            clients={clients}
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
