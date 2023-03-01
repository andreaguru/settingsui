import {getClientList} from "../api/DashboardAPI";
import {ChangeEvent, useEffect, useState} from "react";

// import typescript Interfaces
import {Client, Feature} from "../types/api.types";
import {FeatSelectedStatus} from "../types/componentProps.types";

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
 * showSelectedFeatures
 * it shows the Features that have been selected by the user
 * (e.g. checks if "traffective" and "aktiviert" have been selected and shows the result)
 * @param {Array<Feature>} featuresPerClient
 * @param {FeatSelectedStatus} featureStatus
 * @param {Array<Feature>} filteredFeatures
 * @return {Array<Feature>}
 */
function showSelectedFeatures(featuresPerClient:Array<Feature>,
    featureStatus:FeatSelectedStatus,
    filteredFeatures:Array<Feature>) {
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
 * getFeaturesList
 * @param {Array<Client>} clients
 * @return {Array<Feature>}
 */
function getFeaturesList(clients:Array<Client>) {
    return clients.length > 0 ? clients[0].features : [];
}

/**
 *
 * @param Component
 * @param pageProps
 * @constructor
 */
function MyApp({Component, pageProps}) {
    const [clients, setClients] = useState<Array<Client>>([]);

    // contains the list of clients that have been selected by the user
    const [filteredClients, setFilteredClients] = useState<Array<Client>>([]);

    // contains the list of features that have been selected by the user
    const [filteredFeatures, setFilteredFeatures] = useState<Array<Feature>>([]);

    /* contains the current selected status of the features to show
    (keine Auswahl, aktiviert, deaktiviert / nicht konfiguriert) */
    const [featureStatus, setFeatureStatus] = useState<FeatSelectedStatus>(FeatSelectedStatus.ALL);

    const handleFeatureStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        // the input value has to be a string that is included in the FeatSelectedStatus enum
        setFeatureStatus((event.target as HTMLInputElement).value as FeatSelectedStatus);
    };

    /**
     * getStateWithHasFeaturesProp
     * @param {Array<Client>} clients
     * @return {Array<Client>}
     */
    function getStateWithHasFeaturesProp(clients:Array<Client>) {
        return clients.map((client: Client):Client => {
            return {
                ...client,
                hasFeatures: showSelectedFeatures(client.features, featureStatus, filteredFeatures).length > 0,
            };
        });
    }

    // The code inside this useEffect is called everytime there is a change in filteredClients state
    useEffect(() => {
        /* here we set the status of property hasFeatures for each filtered client.
        hasFeatures is a boolean that tell us if a filtered client
        has features to show according to the current set filters.
        If there are no features, we set hasFeatures to false.
        This property is currently used in MainContent and IDComboSelect.
        Every time the filteredClients changes we update also hasFeatures value */

        if (filteredClients.length) {
            /* add hasFeatures prop to filteredClients state and update the state itself with this new value */
            setFilteredClients(getStateWithHasFeaturesProp(filteredClients));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredClients]);

    /* The code inside this useEffect is called only once, the first time that the Home component is loaded.
    This is the moment when we want to get the clients list from APIs and set the clients status with its value. */
    useEffect(() => {
        const data = getClientList();
        data.then((data) => {
            if (data && data.length) {
                // update the returned data array adding hasFeatures prop to each element of it
                const clientsWithHasFeaturesProperty:Array<Client> = data.map((client:Client):Client => {
                    return {...client, hasFeatures: true};
                });
                // update clients state with the new value
                setClients(clientsWithHasFeaturesProperty);
                setFilteredClients(clientsWithHasFeaturesProperty.filter((e) => e.name === "BlickPunkt Nienburg"));
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    return (
        <div>
            <Component {...pageProps}
                clients={clients}
                filteredClients={filteredClients}
                filteredFeatures={filteredFeatures}
                setFilteredClients={setFilteredClients}
                setFilteredFeatures={setFilteredFeatures}
                showSelectedFeatures={showSelectedFeatures}
                handleFeatureStatusChange={handleFeatureStatusChange}
                getFeaturesList={getFeaturesList}
            />
        </div>
    );
}

export default MyApp;

/* start-test-block */
export {
    showFeaturesPerStatus,
    showSelectedFeatures,
};
/* end-test-block */
