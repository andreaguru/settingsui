import {useReducer, useEffect, useState} from "react";
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

// import Interfaces to check data type in Typescript
import {ClientsInterface, ReducerActions, ReducerActionType} from "../types/api.types";
import MuiAppBar from "@mui/material/AppBar";
import {getIntegratedClientList} from "../api/DashboardAPI";

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
 *
 * @param {ClientsInterface[]} filteredClients
 * @param {ReducerActions} action
 * @return {boolean} true
 */
function filteredClientsReducer(filteredClients: ClientsInterface[], action: ReducerActions): ClientsInterface[] {
    switch (action.type) {
    case ReducerActionType.ADD_VALUE:
        return action.payload;
    case ReducerActionType.DELETE_VALUE:
        return filteredClients.filter((client: ClientsInterface) => client.id !== action.payload.id);
    case ReducerActionType.FILTER_PRO_FEATURE:
        return filteredClients.filter((client: ClientsInterface) => client.id !== action.payload.id);
    default:
        throw new Error();
    }
}

/**
 *
 * @constructor
 */
function Home() {
    const [clients, setClients] = useState<[]>([]);
    const [filteredClients, dispatchFilteredClients] = useReducer(filteredClientsReducer, []);

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
            <Box sx={{display: "flex", paddingTop: "73px"}}>
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
                    dispatchFilteredClients={dispatchFilteredClients} />
                <Box component="main" sx={{
                    backgroundColor: (theme) => (
                        theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]
                    ),
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
                >

                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <MainContent clientsList={clients} filteredClientsList={filteredClients} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Home;
