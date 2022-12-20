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
import {Clients, FeaturesList} from "../types/api.types";

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
