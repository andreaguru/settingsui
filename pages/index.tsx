import {useEffect, useReducer, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// we create a Context for each type of data information, in order to use them everywhere in the app
import {ClientsContext, FilteredClientsContext, FilteredClientsDispatchContext} from "../context/AppContext";

import logo from "../public/eddi-logo.jpg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

// import Interfaces to check data type in Typescript
import {ClientsInterface, ReducerActionType} from "../types/query.types";
import MuiAppBar from "@mui/material/AppBar";
import {getIntegratedClientList} from "../api/DashboardAPI";

type ReducerAction = {
    type: ReducerActionType;
    payload: ClientsInterface[] | number;
};

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
 * @param {ClientsInterface[]} state
 * @param {ReducerAction} action
 * @return {boolean} true
 */
function filteredClientsReducer(state: ClientsInterface[], action: ReducerAction): ClientsInterface[] {
    switch (action.type) {
    case ReducerActionType.ADD_CLIENT:
        return (typeof action.payload !== "number") ? action.payload : [];
    case ReducerActionType.DELETE_CLIENT:
        return state.filter((client: ClientsInterface) => client.id !== action.payload);
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
    const [state, dispatch] = useReducer(filteredClientsReducer, []);

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
        <ClientsContext.Provider value={clients}>
            <FilteredClientsContext.Provider value={state}>
                <FilteredClientsDispatchContext.Provider value={dispatch}>
                    <ThemeProvider theme={mdTheme}>
                        <Box sx={{display: "flex"}}>
                            <CssBaseline/>
                            <MuiAppBar position="absolute" sx={{
                                zIndex: mdTheme.zIndex.drawer + 1,
                            }}>
                                <Toolbar
                                    sx={{
                                        pr: "249px", // keep right padding when drawer closed
                                    }}
                                >
                                    <List component="nav">
                                        <Image alt="" layout="fixed" src={logo} width={50} height={50}/>
                                    </List>
                                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
                                        Dashboard
                                    </Typography>
                                </Toolbar>
                            </MuiAppBar>
                            <Sidebar/>
                            <Box component="main" sx={{
                                backgroundColor: (theme) => (
                                    theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]
                                ),
                                flexGrow: 1,
                                height: "100vh",
                                overflow: "auto",
                            }}
                            >
                                <Toolbar/>
                                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <MainContent/>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        </Box>
                    </ThemeProvider>
                </FilteredClientsDispatchContext.Provider>
            </FilteredClientsContext.Provider>
        </ClientsContext.Provider>
    );
}

export default Home;
