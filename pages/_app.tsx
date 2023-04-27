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

    const {fltrClients, fltrFeatures} = router.query;

    // contains the list of clients that have been selected by the user
    const [filteredClients, setFilteredClients] = useState<Array<Client>>([]);

    // contains the list of features that have been selected by the user
    const [filteredFeatures, setFilteredFeatures] = useState<Array<Feature>>([]);

    /* contains the current selected status of the features to show
    (keine Auswahl, aktiviert, deaktiviert / nicht konfiguriert) */
    const [featureStatus, setFeatureStatus] = useState<FeatSelectedStatus>(FeatSelectedStatus.ALL);

    const [isLoading, setLoading] = useState(true);

    const [clientsAreLoaded, setClientsAreLoaded] = useState(false);

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
                setLoading(false);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // if router is not ready or clients state is still empty, do nothing
        if (!clients.length || clientsAreLoaded) return;

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

        setClientsAreLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients]);

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
    but not the first time the component is rendered, like it happens for a normal useEffect */
    useUpdateEffect(() => {
        // we create an array with all names of selected clients
        const filteredClientNames = filteredClients.map((a) => a.name);
        // we create an array with all names of selected clients
        const filteredFeatureNames = filteredFeatures.map((a) => a.name);

        // we update the url according to app state only if the page is home
        if (router.pathname === "/") {
            if (filteredClients.length || filteredFeatures.length) {
                router.push({
                    query: {
                        ...(filteredClientNames.length && {fltrClients: JSON.stringify(filteredClientNames)}),
                        ...(filteredFeatureNames.length && {fltrFeatures: JSON.stringify(filteredFeatureNames)}),
                    },
                });
            } else {
                router.replace("/", undefined, {shallow: true});
            }
        }
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
            isLoading={isLoading}
        />
    );
}

export default TemplatePage;

/* start-test-block */
export {
    showFeaturesPerStatus,
};
/* end-test-block */
