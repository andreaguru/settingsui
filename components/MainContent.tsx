import {Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";

// import typescript Interfaces
import {Client} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import ClientCard from "./ClientCard";
import {useEffect} from "react";

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
    const router = useRouter();
    /* filter the clients that have to be shown, according to current filter status */
    /**
     * shownClients
     * @return {Array<Client>}
     */
    function shownClients():Array<Client> {
        const clients = filteredClientsList.length ? filteredClientsList : clientsList;
        return clients.filter((client) => client.hasFeatures === true);
    }

    /* with useEffect we look for changes in clientList state.
    When clientList is updated with values, we check if a jump to hash is needed. */
    useEffect(() => {
        // Detect if an anchor is present in the URL
        const {hash, pathname, search} = window.location;
        const urlWithoutHash = pathname + search;
        if (hash && clientsList.length > 0) {
            // Scroll to the anchor if the element is present
            const anchorElement = document.getElementById(hash.replace("#", ""));
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
            router.replace(urlWithoutHash);
        }
    }, [router, clientsList]);

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
                    showSelectedFeatures={showSelectedFeatures}/>
                ))}
        </>
    );
}

export default MainContent;

