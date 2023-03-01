import {Button, Card, CardContent, Typography} from "@mui/material";
import ClientIcon from "@mui/icons-material/Apartment";
import TagIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/AccountTree";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import IDInfoButton from "./IDInfoButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// import typescript Interfaces
import {Client, Feature} from "../types/api.types";
import {FeatSelectedStatus, MainContentProps} from "../types/componentProps.types";
import NextLink from "next/link";

/**
 * getFeatureColorByStatus
 * @param {string} status
 * @param {FeatSelectedStatus} featureStatus
 * @return {string}
 */
function getFeatureColorByStatus(status:string, featureStatus?:FeatSelectedStatus):"success" | "error" | "disabled" {
    switch (status) {
    case "ENABLED":
        return "success";
    case "DISABLED":
        return "error";
    case "ENABLED_AND_DISABLED":
        if (featureStatus === "ACTIVE") {
            return "success";
        } else return "error";
    case "NONE":
        return "disabled";
    default: return "disabled";
    }
}

/**
 * MainContent component. It accepts 2 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 * @constructor
 */
function MainContent({
    clientsList,
    filteredClientsList,
    filteredFeatures,
    showSelectedFeatures,
    featureStatus}:MainContentProps) {
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
            <Typography variant="h6" component="h6">Mandanten</Typography>
            <Typography variant="body1" component="p">{shownClients().length} von {clientsList.length}</Typography>
            <IDInfoButton align="right"/>
            {shownClients().map((client: Client, index: number) => (
                client.hasFeatures && client.features && <Fade in key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" component="h2">
                                {client.name} ({client.id})
                            </Typography>
                            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                                {showSelectedFeatures(
                                    client.features,
                                    featureStatus,
                                    filteredFeatures).map((feature:Feature, index:number) => (
                                    <NextLink key={index} href={`/feature/${client.id}/${feature.name}`} passHref>
                                        <Button component="a" onClick={() => console.log(feature.name)}>
                                            <Grow in>
                                                <IconButton component="div">
                                                    <ClientIcon
                                                        color={getFeatureColorByStatus(feature.client, featureStatus)} />
                                                    <CategoryIcon
                                                        color={getFeatureColorByStatus(feature.category, featureStatus)} />
                                                    <TagIcon color={getFeatureColorByStatus(feature.tag, featureStatus)} />
                                                    <Typography variant="body2">{feature.name}</Typography>
                                                </IconButton>
                                            </Grow>
                                        </Button>
                                    </NextLink>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
            ))}
        </>
    );
}

export default MainContent;

/* start-test-block */
export {
    getFeatureColorByStatus,
};
/* end-test-block */
