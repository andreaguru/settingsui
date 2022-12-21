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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiAppBar from "@mui/material/AppBar";

// import custom Components
import logo from "../assets/edid-logo.jpg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import {getIntegratedClientList} from "../api/DashboardAPI";

// import typescript Interfaces
import {Clients, Feature, FeaturesList} from "../types/api.types";

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
    const [clients, setClients] = useState<Clients[]>([]);
    const [filteredClients, setFilteredClients] = useState<Clients[]>([]);
    const [filteredFeatures, setFilteredFeatures] = useState<FeaturesList[]>([]);
    const [featureStatus, setFeatureStatus] = useState<string>("NONE");

    const handleFeatureStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFeatureStatus((event.target as HTMLInputElement).value);
    };

    const showFeaturesPerStatus = (featuresPerClient:Feature[]) => {
        switch (featureStatus) {
        case "ACTIVE":
            return featuresPerClient.filter(
                (feat:Feature) => {
                    return Object.values(feat).includes("ENABLED") ||
                       Object.values(feat).includes("ENABLED_AND_DISABLED");
                }
            );
        case "INACTIVE":
            return featuresPerClient.filter(
                (feat:Feature) => {
                    return (Object.values(feat).includes("DISABLED") ||
                        Object.values(feat).includes("ENABLED_AND_DISABLED") ||
                        Object.values(feat).every((value) => value === "NONE"));
                }
            );
        case "":
            return featuresPerClient;
        default:
            return featuresPerClient;
        }
    };

    const showSelectedFeatures = (featuresPerClient:Feature[]) => {
        // check features status
        const featuresFilteredPerStatus = showFeaturesPerStatus(featuresPerClient);

        if (filteredFeatures.length > 0) {
            return (
                featuresFilteredPerStatus.filter((feat:Feature) => filteredFeatures.some((el) => el.name === feat.name))
            );
        } else return featuresFilteredPerStatus;
    };

    useEffect(() => {
        const newState:Clients[] = clients.map((client:Clients) => {
            return {...client, hasFeatures: showSelectedFeatures(client.features).length > 0};
        });
        setClients(newState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featureStatus, filteredFeatures]);

    useEffect(() => {
        const data = getIntegratedClientList();
        data.then((data) => {
            if (data) {
                const newState = data.map((client:Clients) => {
                    return {...client, hasFeatures: true};
                });
                setClients(newState);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ThemeProvider theme={edidTheme}>
            {/* use the variable declared in the createTheme to get the height of the header */}
            <Box sx={{display: "flex", pt: edidTheme.variables.headerMarginTop}}>
                <CssBaseline/>
                <MuiAppBar position="absolute">
                    <Toolbar>
                        <List component="nav">
                            <Image alt="" layout="fixed" src={logo} width={50} height={50}/>
                        </List>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                            Dashboard
                        </Typography>
                    </Toolbar>
                </MuiAppBar>
                <Sidebar
                    clients={clients}
                    filteredClients={filteredClients}
                    setFilteredClients={setFilteredClients}
                    filteredFeatures={filteredFeatures}
                    setFilteredFeatures={setFilteredFeatures}
                    handleFeatureStatusChange={handleFeatureStatusChange}/>

                <Container component="main" maxWidth="lg">
                    <Grid item xs={12}>
                        <MainContent
                            clientsList={clients}
                            filteredClientsList={filteredClients}
                            filteredFeatures={filteredFeatures}
                            featureStatus={featureStatus}/>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Home;
