import {Card, CardContent, Typography} from "@mui/material";
import {Clients, Feature} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";

/**
 *
 * @constructor
 */
function MainContent({clientsList, filteredClientsList, filteredFeatures, featureStatus}: MainContentProps) {
    const shownClients = filteredClientsList.length ? filteredClientsList : clientsList;

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
            {shownClients.map((client: Clients, index: number) => (
                <Fade in key={index}>
                    <Card>
                        <CardContent>
                            {client.features &&
                            showSelectedFeatures(client.features).map((feature:Feature, index:number) => (
                                <Grow in key={index}>
                                    <Box display="inline-block" sx={{m: 2}}>
                                        <CircleIcon color={showFeatureStatus(feature.client)} />
                                        <CircleIcon color={showFeatureStatus(feature.category)} />
                                        <CircleIcon color={showFeatureStatus(feature.tag)} />
                                        <span>{feature.name}</span>
                                    </Box>
                                </Grow>
                            ))}
                            <Typography color="text.secondary" gutterBottom> </Typography>
                            <Typography variant="h5" component="div">
                                {client.name}
                            </Typography>
                            <Typography variant="body2"> </Typography>
                        </CardContent>
                    </Card>
                </Fade>
            ))}
        </>
    );
}

export default MainContent;
