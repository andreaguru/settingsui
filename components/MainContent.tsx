import {Card, CardContent, Typography} from "@mui/material";
import {ClientsInterface} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";

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
function MainContent({clientsList, filteredClientsList}: MainContentProps) {
    const shownClients = filteredClientsList.length ? filteredClientsList : clientsList;

    return (
        <>
            {shownClients.map((client: ClientsInterface, index: number) => (
                <Card key={index}>
                    <CardContent>
                        {client.features.map((feature, index) => (
                            <Box key={index} display="inline-block">
                                <CircleIcon color={showFeatureStatus(feature.client)} />
                                <CircleIcon color={showFeatureStatus(feature.category)} />
                                <CircleIcon color={showFeatureStatus(feature.tag)} />
                                <span>{feature.name}</span>
                            </Box>
                        ))}
                        <Typography color="text.secondary" gutterBottom>
                            test
                        </Typography>
                        <Typography variant="h5" component="div">
                            {client.name}
                        </Typography>
                        <Typography variant="body2">
                            test body2 style
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export default MainContent;
