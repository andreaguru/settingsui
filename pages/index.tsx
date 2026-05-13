// import MUI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

// import custom Components
import { ReactElement } from "react";
import MainContent from "components/MainContent";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import { HomeProps } from "types/componentProps.types";
import IDLoader from "components/shared/IDLoader";
import { useHomeAuth } from "../features/dashboard/hooks/useHomeAuth";

const AppContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    paddingTop: theme.spacing(9),
}));

/**
 * The Home Page. This is currently the only page of the project.
 * Here are declared the states that are used throughout the App.
 * The states can be updated via setters (e.g. setClients).
 * The setters can be passed as props to children components and called from there.
 * In useEffect we retrieve the infos that are needed when the App is loaded.
 *
 * @constructor
 */
function Home({ children }: Readonly<HomeProps>): ReactElement {
    const { isAuthLoading, shouldBlockRender, userData } = useHomeAuth();

    if (isAuthLoading) {
        return <IDLoader />;
    }

    if (shouldBlockRender) {
        return <div />;
    }

    return (
        <>
            <CssBaseline />
            {/* use the variable declared in the createTheme to get the height of the header */}
            <AppContainer>
                <Header name={userData.name} img={userData.imgUrl} />
                <Sidebar /* setFeatureStatus={setFeatureStatus} */ />
                <Container component="main" className="mainContent" maxWidth={false}>
                    <Grid size={{ xs: 12 }}>
                        <MainContent />
                    </Grid>
                </Container>
            </AppContainer>
            {children}
        </>
    );
}

export default Home;
