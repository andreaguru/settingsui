import {ChangeEvent, useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import logo from "../assets/edid-logo.jpg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import MuiAppBar from "@mui/material/AppBar";
import {getIntegratedClientList} from "../api/DashboardAPI";

import {Clients, FeaturesList} from "../types/api.types";

const mdTheme = createTheme({
    components: {
        // Name of the component
        MuiChip: {
            styleOverrides: {
                // Name of the slot
                deleteIcon: {
                    // Some CSS
                },
            },
        },
    },
});

/**
 * The Home Page. This is currently the only page of the project.
 * Here are set the states that are used throughout the all App.
 * In useEffect are retrieved the infos that are needed when the App is loaded.
 *
 * @constructor
 */
function Home() {
    const [clients, setClients] = useState<[]>([]);
    const [filteredClients, setFilteredClients] = useState<Clients[]>([]);
    const [filteredFeatures, setFilteredFeatures] = useState<FeaturesList[]>([]);
    const [featureStatus, setFeatureStatus] = useState<string>("NONE");

    const handleFeatureStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFeatureStatus((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        const data = getIntegratedClientList();
        data.then((data) => {
            if (data) {
                setClients(data);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: "flex", paddingTop: 8}}>
                <CssBaseline/>
                <MuiAppBar position="absolute" sx={{
                    zIndex: (theme) => (theme.zIndex.drawer + 1),
                }}>
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
                <Box component="main" sx={{
                    backgroundColor: (theme) => (
                        theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]
                    ),
                }}
                >

                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <MainContent
                                    clientsList={clients}
                                    filteredClientsList={filteredClients}
                                    filteredFeatures={filteredFeatures}
                                    featureStatus={featureStatus}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Home;
