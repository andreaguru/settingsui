import {Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

// import typescript Interfaces
import {Client} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import ClientCard from "./ClientCard";

/**
 * MainContent component. It accepts 6 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 * @constructor
 */
function MainContent({
    clientsList,
    filteredClientsList,
    filteredFeatures,
    showSelectedFeatures,
    featureStatus,
    isLoading}:MainContentProps) {
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
            {/* <IDInfoButton className="infoButton" align="right"/> */}
            {/* if loading is in progress, show the placeholder elements */
                isLoading &&
                <>
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={180} />
                </>
            }
            {/* if loading process is done, show the client list */
                !isLoading && shownClients().map((client: Client, index: number) => (client.features &&
                <ClientCard
                    key={index}
                    client={client}
                    filteredFeatures={filteredFeatures}
                    showSelectedFeatures={showSelectedFeatures}
                    featureStatus={featureStatus}/>
                ))}
        </>
    );
}

export default MainContent;

