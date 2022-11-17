import {useReducer, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import MUI Components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import logo from "../public/eddi-logo.jpg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

// import Interfaces to check data type in Typescript
import {ClientsInterface, ReducerAction, ReducerActionType} from "../types/query.types";
import MuiAppBar from "@mui/material/AppBar";

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
 * @param {ClientsInterface[]} filteredClient
 * @param {ReducerAction} action
 * @return {boolean} true
 */
function filteredClientsReducer(filteredClient: ClientsInterface[], action: ReducerAction): ClientsInterface[] {
    switch (action.type) {
    case ReducerActionType.ADD_CLIENT:
        return (typeof action.payload !== "number") ? action.payload : [];
    case ReducerActionType.DELETE_CLIENT:
        return filteredClient.filter((client: ClientsInterface) => client.id !== action.payload);
    default:
        throw new Error();
    }
}

/**
 *
 * @constructor
 */
function Home({clientList}:any) {
    const [clients] = useState<[]>(clientList);
    const [filteredClient, dispatchFilteredClients] = useReducer(filteredClientsReducer, []);

    /* useEffect(() => {
        const data = getIntegratedClientList();
        data.then((data) => {
            if (data) {
                setClients(data);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);*/

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <MuiAppBar position="absolute" sx={{
                    zIndex: mdTheme.zIndex.drawer + 1,
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
                    clientsList={clients}
                    filteredClientsList={filteredClient}
                    dispatchFilteredClientsList={dispatchFilteredClients} />
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
                                <MainContent clientsList={clients} filteredClientsList={filteredClient} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

// This function gets called at build time
/**
 *
 * @constructor
 */
export async function getStaticProps() {
    const response = await fetch("http://localhost:3004/clients");
    // return two arrays with the data from the two fetch requests
    const clientsPromise = await response.json();
    // filter the result in order to show only clients that have a name
    const clientList = clientsPromise.filter((client: ClientsInterface) => client.name);

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            clientList,
        },
    };
}

export default Home;
