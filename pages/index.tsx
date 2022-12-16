import {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import logo from "../assets/eddi-logo.jpg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import MuiAppBar from "@mui/material/AppBar";
import {getIntegratedClientList} from "../api/DashboardAPI";

import {Clients} from "../types/api.types";

const headerHeight = "80px";

// create MUI Theme and assign custom style rules for each MUI component
const mdTheme = createTheme({
    components: {
        // Style the main container
        MuiContainer: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.component === "main" && {
                        backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: `calc(100vh - ${headerHeight})`,
                        overflow: "auto",
                        paddingTop: 10,
                        paddingBottom: 10,
                    }),
                }),
            },
        },
        // Style the AppBar
        MuiAppBar: {
            styleOverrides: {
                root: ({theme}) => ({
                    zIndex: theme.zIndex.drawer + 1,
                }),
            },
        },
        // Style the Autcomplete
        MuiAutocomplete: {
            styleOverrides: {
                endAdornment: {
                    top: 0,
                },
            },
        },
    },
});

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
            <Box sx={{display: "flex", pt: headerHeight}}>
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
                    setFilteredClients={setFilteredClients} />

                <Container component="main" maxWidth="lg">
                    <Grid item xs={12}>
                        <MainContent clientsList={clients} filteredClientsList={filteredClients} />
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Home;
