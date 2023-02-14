import {Card, CardContent, Typography} from "@mui/material";
import TagIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/AccountTree";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
// import IDInfoButton from "./IDInfoButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

// import typescript Interfaces
import {Client, Feature} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";

import {useTheme} from "@mui/material/styles";
import {Theme} from "@mui/system";
import {lighten} from "@mui/system/colorManipulator";

/**
 * getFeatureColorByStatus - return the right icon color according to category and tag status
 * @param {string} status
 * @return {string}
 */
function getIconColorByStatus(status:string) {
    switch (status) {
    case "ENABLED":
        return "success";
    case "DISABLED":
        return "error";
    case "ENABLED_AND_DISABLED":
        return "warning";
    case "NONE":
    default: return "disabled";
    }
}

/**
 * getClientColorByStatus - return the right color of text and background according to feature client status
 * @param {string} status
 * @param {Theme} theme
 * @param {boolean} isBackground
 * @return {string}
 */
function getClientColorByStatus(status:string, theme:Theme, isBackground?:boolean) {
    switch (status) {
    case "ENABLED":
        return isBackground ? theme.palette.success.light : theme.palette.success.main;
    case "DISABLED":
    case "NONE":
        return isBackground ? theme.palette.neutral.light : theme.palette.neutral.main;
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

    const theme = useTheme();

    return (
        <>
            <Typography variant="h6" component="h6">Mandanten</Typography>
            <Typography variant="body1" component="p">{shownClients().length} von {clientsList.length}</Typography>
            {/* <IDInfoButton className="infoButton" align="right"/> */}
            {isLoading &&
                <>
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={180} />
                </>
            }
            {!isLoading && shownClients().map((client: Client, index: number) => (
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
                                    filteredFeatures).map((feature:Feature, index:number) => {
                                    const clientColor = getClientColorByStatus(
                                        feature.client,
                                        theme,
                                        true);
                                    return <Grow in key={index}>
                                        <IconButton className="iconStatus"
                                            sx={[
                                                {
                                                    color: getClientColorByStatus(feature.client, theme),
                                                    backgroundColor: clientColor,
                                                },
                                                {
                                                    "&:hover": {
                                                        backgroundColor: lighten(clientColor, 0.3),
                                                        boxShadow: "0 3px 3px rgb(0 0 0 / 12%)",
                                                    },
                                                },
                                            ]}>
                                            <Typography variant="subtitle2">{feature.name}</Typography>
                                            <CategoryIcon fontSize="small"
                                                color={getIconColorByStatus(feature.category)}/>
                                            <TagIcon fontSize="small" color={getIconColorByStatus(feature.tag)}/>
                                        </IconButton>
                                    </Grow>;
                                })}
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
    getIconColorByStatus,
    getClientColorByStatus,
};
/* end-test-block */
