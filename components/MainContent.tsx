import { Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

// import typescript Interfaces
import { Client } from "types/api.types";
import { use } from "react";
import { AppContext } from "context/AppContext";
import { useRouter } from "next/router";
import ClientCard from "./ClientCard";

// import custom components
import IDInfoButton from "./shared/IDInfoButton";

/**
 * MainContent function is responsible for rendering the main content section of the application.
 * It displays a list of clients based on the current filter status.
 */
function MainContent() {
    const theme = useTheme();
    const { clients, clientsLoading, filteredClients } = use(AppContext);
    const router = useRouter();
    const isIndexPage = router.pathname === "/";

    /* filter the clients that have to be shown, according to current filter status */
    /**
     * shownClients
     * @return {Array<Client>}
     */
    const shownClients: Client[] = filteredClients.length ? filteredClients : clients;

    // We want to show the main content only if we are on the home page
    if (!isIndexPage) return null;

    // To be refactored later
    return (
        <Grid size={{ xs: 12 }}>
            <Box sx={{ pb: theme.spacing(3) }}>
                <Typography variant="h6" component="h6">
                    Mandanten
                </Typography>
                <Typography variant="body1" component="p">
                    {shownClients.length} von {clients.length}
                </Typography>
            </Box>
            <IDInfoButton align="right" />
            {
                /* if loading is in progress, show the placeholder elements.
                Placeholders height is the same as ClientCard */
                clientsLoading ?
                    (
                        <>
                            <Skeleton
                                variant="rounded"
                                height={theme.spacing(theme.custom.clientCardHeight)} />
                            <Skeleton
                                variant="rounded"
                                height={theme.spacing(theme.custom.clientCardHeight)} />
                        </>
                    ) :
                    (
                        shownClients.map((client: Client) => (
                            <ClientCard key={client.id} client={client} />
                        ))
                    )}
        </Grid>
    );
}

export default MainContent;
