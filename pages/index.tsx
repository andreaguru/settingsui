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
import logo from "../assets/logo.svg";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import {HomeProps} from "../types/componentProps.types";

/**
 * The Home Page. This is currently the only page of the project.
 * Here are declared the states that are used throughout the App.
 * The states can be updated via setters (e.g. setClients).
 * The setters can be passed as props to children components and called from there.
 * In useEffect we retrieve the infos that are needed when the App is loaded.
 *
 * @constructor
 */
function Home({...props}: HomeProps) {
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
                    clients={props.clients}
                    filteredClients={props.filteredClients}
                    filteredFeatures={props.filteredFeatures}
                    setFilteredClients={props.setFilteredClients}
                    setFilteredFeatures={props.setFilteredFeatures}
                    setFeatureStatus={props.setFeatureStatus}/>

                <Container component="main" maxWidth={false}>
                    <Grid item xs={12}>
                        <MainContent
                            clientsList={props.clients}
                            filteredClientsList={props.filteredClients}
                            showSelectedFeatures={props.showSelectedFeatures}
                            isLoading={props.isLoading}/>
                    </Grid>
                </Container>
            </Box>
            {props.children}
        </ThemeProvider>
    );
}

export default Home;
