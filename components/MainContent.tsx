import {Card, CardContent, Typography} from "@mui/material";
import {Clients, Feature} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";

const showFeatureStatus = (status:boolean|null) => {
    switch (status) {
    case true:
        return "success";
    case false:
        return "error";
    case null:
        return "disabled";
    }
};

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
        if (featuresPerClient !== null) {
            return featuresPerClient.filter(
                (feat:Feature) => {
                    return featureStatus ? !Object.values(feat).includes(false) : Object.values(feat).includes(false);
                }
            );
        } else return featuresPerClient;
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
