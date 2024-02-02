import {Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";

// import typescript Interfaces
import {Client} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import ClientCard from "./ClientCard";

// import custom components
import IDInfoButton from "./IDInfoButton";

/**
 * MainContent component. It accepts 6 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 * @constructor
 */
function MainContent({
    clientsList,
    filteredClientsList,
    showSelectedFeatures,
    isLoading}: MainContentProps) {
    const theme = useTheme();
    /* filter the clients that have to be shown, according to current filter status */
    /**
     * shownClients
     * @return {Array<Client>}
     */
    function shownClients():Array<Client> {
        const clients = filteredClientsList.length ? filteredClientsList : clientsList;
        return clients.filter((client) => client.hasFeatures === true);
    }

    return (
        <>
            <Box sx={{paddingBottom: "20px"}}>
                <Typography variant="h6" component="h6">Mandanten</Typography>
                <Typography variant="body1" component="p">{shownClients().length} von {clientsList.length}</Typography>
            </Box>
            <IDInfoButton align="right"/>
            {/* if loading is in progress, show the placeholder elements.
            Placeholders height is the same as ClientCard */
                isLoading &&
                <>
                    <Skeleton variant="rounded" height={theme.spacing(22)} />
                    <Skeleton variant="rounded" height={theme.spacing(22)} />
                    <Skeleton variant="rounded" height={theme.spacing(22)} />
                    <Skeleton variant="rounded" height={theme.spacing(22)} />
                </>
            }
            {/* if loading process is done, show the client list */
                !isLoading && shownClients().map((client: Client, index: number) => (client.features &&
                <ClientCard
                    key={index}
                    client={client}
                    showSelectedFeatures={showSelectedFeatures}/>
                ))}
        </>
    );
}

export default MainContent;

