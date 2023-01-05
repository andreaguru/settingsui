import {ChangeEvent, useEffect, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {edidTheme} from "../themes/edid";

// import Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import MUI Components
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiAppBar from "@mui/material/AppBar";

// import custom Components
import logo from "../assets/EdID_Logo.svg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import {getClientList} from "../api/DashboardAPI";

// import typescript Interfaces
import {Client, Feature, FeatureList} from "../types/api.types";
import {FeatSelectedStatus} from "../types/componentProps.types";

/**
 * check if features status has been selected in combobox.
 * If so, returns the features array filtered per status. If not, return the features array without any modification.
 * @param {Feature[]} featuresPerClient
 * @param {string} featureStatus
 * @return {Feature[]}
 */
function showFeaturesPerStatus(featuresPerClient:Feature[], featureStatus:FeatSelectedStatus) {
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

// TODO: Are we doing this logic multiple times? Can't we migrate it with the stuff from MainContent.tsx?
/* ANSWER: we need to have all these features methods available in index.tsx.
The filteredFeatures and featureStatus state are needed in IDComboSelect and MainContent components,
therefore all the methods that can update them need to be in the index, and passed down to the children components */
/**
 * showSelectedFeatures
 * it shows the Features that have been selected by the user
 * (e.g. checks if "traffective" and "aktiviert" have been selected and shows the result)
 * @param {Feature[]} featuresPerClient
 * @param {FeatSelectedStatus} featureStatus
 * @param {FeatureList[]} filteredFeatures
 * @return {Feature[]}
 */
function showSelectedFeatures(featuresPerClient:Feature[], featureStatus:FeatSelectedStatus, filteredFeatures:FeatureList[]) {
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
 * The Home Page. This is currently the only page of the project.
 * Here are declared the states that are used throughout the App.
 * The states can be updated via setters (e.g. setClients).
 * The setters can be passed as props to children components and called from there.
 * In useEffect we retrieve the infos that are needed when the App is loaded.
 *
 * @constructor
 */
function Home() {
    const [clients, setClients] = useState<Client[]>([]);

    // contains the list of clients that have been selected by the user
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);

    // contains the list of features that have been selected by the user
    const [filteredFeatures, setFilteredFeatures] = useState<FeatureList[]>([]);

    // contains the current selected status of the features to show (keine Auswahl, aktiviert, deaktiviert / nicht konfiguriert)
    const [featureStatus, setFeatureStatus] = useState<FeatSelectedStatus>(FeatSelectedStatus.ALL);

    const handleFeatureStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        // the input value has to be a string that is included in the FeatSelectedStatus enum
        setFeatureStatus((event.target as HTMLInputElement).value as FeatSelectedStatus);
    };

    /**
     * getStateWithHasFeaturesProp
     * @param {Client[]} clients
     * @return {Client[]}
     */
    function getStateWithHasFeaturesProp(clients:Client[]) {
        return clients.map((client: Client):Client => {
            return {...client, hasFeatures: showSelectedFeatures(client.features, featureStatus, filteredFeatures).length > 0};
        });
    }

    /* The code inside this useEffect is called only once, the first time that the Home component is loaded.
    This is the moment when we want to get the clients list from APIs and set the clients status with its value. */
    useEffect(() => {
        const data = getClientList();
        data.then((data) => {
            if (data && data.length) {
                // update the returned data array adding hasFeatures prop to each element of it
                const clientsWithHasFeaturesProperty:Client[] = data.map((client:Client):Client => {
                    return {...client, hasFeatures: true};
                });
                // update clients state with the new value
                setClients(clientsWithHasFeaturesProperty);
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

    // The code inside this useEffect is called everytime there is a change in filteredClients state
    useEffect(() => {
        /* here we set the status of property hasFeatures for each filtered client.
        hasFeatures is a boolean that tell us if a filtered client has features to show according to the current set filters.
        If there are no features, we set hasFeatures to false.
        This property is currently used in MainContent and IDComboSelect.
        Every time the filteredClients changes we update also hasFeatures value */

        if (filteredClients.length) {
            /* add hasFeatures prop to filteredClients state and update the state itself with this new value */
            setFilteredClients(getStateWithHasFeaturesProp(filteredClients));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredClients]);

    return (
        <ThemeProvider theme={edidTheme}>
            {/* use the variable declared in the createTheme to get the height of the header */}
            <Box sx={{display: "flex", pt: edidTheme.variables.headerMarginTop}}>
                <CssBaseline/>
                <MuiAppBar position="absolute">
                    <Toolbar>
                        <List component="nav">
                            <Image alt="" layout="fixed" src={logo} width={91} height={34}/>
                        </List>
                    </Toolbar>
                </MuiAppBar>
                <Sidebar
                    clients={clients}
                    filteredClients={filteredClients}
                    setFilteredClients={setFilteredClients}
                    filteredFeatures={filteredFeatures}
                    setFilteredFeatures={setFilteredFeatures}
                    handleFeatureStatusChange={handleFeatureStatusChange}/>

                <Container component="main" maxWidth={false}>
                    <Grid item xs={12}>
                        <MainContent
                            clientsList={clients}
                            filteredClientsList={filteredClients}
                            filteredFeatures={filteredFeatures}
                            showSelectedFeatures={showSelectedFeatures}
                            featureStatus={featureStatus}/>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Home;

/* start-test-block */
export {
    showFeaturesPerStatus,
    showSelectedFeatures,
};
/* end-test-block */
