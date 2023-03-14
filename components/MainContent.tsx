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
        return "success"; // #319E7D
    case "DISABLED":
        return "error"; // #F15653
    case "ENABLED_AND_DISABLED":
        return "warning"; // #FDAD0D
    case "NONE":
    default: return "disabled"; // #A5A5A5
    }
}

/**
 * getButtonColorByStatus - return the right color of text and background according to feature client status
 * @param {string} status
 * @param {Theme} theme
 * @return {string}
 */
function getButtonColorByStatus(status:string, theme:Theme) {
    switch (status) {
    case "ENABLED":
        return {bgColor: theme.palette.success.light, color: theme.palette.success.main};
    case "DISABLED":
    case "NONE":
        return {bgColor: theme.palette.neutral.light, color: theme.palette.neutral.main};
    default: return {bgColor: theme.palette.neutral.light, color: theme.palette.neutral.main};
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
            <Box sx={{paddingBottom: "20px"}}>
                <Typography variant="h6" component="h6">Mandanten</Typography>
                <Typography variant="body1" component="p">{shownClients().length} von {clientsList.length}</Typography>
            </Box>
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
                    <Card data-testid={client.id}>
                        <CardContent>
                            <Typography variant="body1" component="h2">
                                {client.name} ({client.id})
                            </Typography>
                            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                                {showSelectedFeatures(
                                    client.features,
                                    featureStatus,
                                    filteredFeatures).map((feature:Feature, index:number) => {
                                    // set background color of the button according to feature client status
                                    const clientColor = getButtonColorByStatus(feature.client, theme).bgColor;

                                    return <Grow in key={index}>
                                        <IconButton className="iconStatus"
                                            sx={[
                                                {
                                                    color: getButtonColorByStatus(feature.client, theme).color,
                                                    backgroundColor: clientColor,
                                                },
                                                {
                                                    "&:hover": {
                                                        backgroundColor: lighten(clientColor, 0.3),
                                                        boxShadow: "0 3px 3px rgb(0 0 0 / 12%)",
                                                    },
                                                },
                                            ]}>
                                            <Typography variant="subtitle2">{feature.label}</Typography>
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
    getButtonColorByStatus,
};
/* end-test-block */
