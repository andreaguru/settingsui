import {Card, CardContent, Typography} from "@mui/material";
import {Clients, Feature} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import IDInfoButton from "./IDInfoButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

/**
 * MainContent component. It accepts 2 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 *
 * @constructor
 */
function MainContent({clientsList, filteredClientsList, filteredFeatures, featureStatus}: MainContentProps) {
    const filteredClientsListSize = filteredClientsList.length;
    const shownClients = filteredClientsListSize ? filteredClientsList : clientsList;

    /**
     *
     * @param {Feature[]} featuresPerClient
     * @return {Feature[]}
     */
    function showFeaturesPerStatus(featuresPerClient:Feature[]) {
        switch (featureStatus) {
        case "ACTIVE":
            return featuresPerClient.filter(
                (feat:Feature) => {
                    return Object.values(feat).includes("ENABLED") ||
                       Object.values(feat).includes("ENABLED_AND_DISABLED");
                }
            );
        case "INACTIVE":
            return featuresPerClient.filter(
                (feat:Feature) => {
                    return (Object.values(feat).includes("DISABLED") ||
                        Object.values(feat).includes("ENABLED_AND_DISABLED") ||
                        Object.values(feat).every((value) => value === "NONE"));
                }
            );
        case "":
            return featuresPerClient;
        default:
            return featuresPerClient;
        }
    }

    const showSelectedFeatures = (featuresPerClient:Feature[]) => {
        // check features status
        const featuresFilteredPerStatus = showFeaturesPerStatus(featuresPerClient);

        if (filteredFeatures.length > 0) {
            return (
                featuresFilteredPerStatus.filter((feat:Feature) => filteredFeatures.some((el) => el.name === feat.name))
            );
        } else return featuresFilteredPerStatus;
    };

    const showFeatureStatus = (status:string) => {
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
        }
    };

    return (
        <>
            <Typography variant="h5" component="h1">
                Mandanten
            </Typography>
            {filteredClientsListSize || clientsList.length} von {clientsList.length}
            <IDInfoButton align="right"/>
            {shownClients.map((client: Clients, index: number) => (
                <Fade in key={index}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom> </Typography>
                            <Typography variant="h5" component="div">
                                {client.name} ({client.id})
                            </Typography>
                            <Typography variant="body2"> </Typography>
                            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                                {client.features &&
                                showSelectedFeatures(client.features).map((feature:Feature, index:number) => (
                                    <Grow in key={index}>
                                        <IconButton component="div" >
                                            <ApartmentIcon color={showFeatureStatus(feature.client)} />
                                            <AccountTreeIcon color={showFeatureStatus(feature.category)} />
                                            <LocalOfferIcon color={showFeatureStatus(feature.tag)} />
                                            <Typography variant="body2">{feature.name}</Typography>
                                        </IconButton>
                                    </Grow>
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
