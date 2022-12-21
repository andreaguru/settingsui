import {Card, CardContent, Typography} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import IDInfoButton from "./IDInfoButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// import typescript Interfaces
import {Clients, Feature} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";

/**
 * MainContent component. It accepts 2 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 *
 * @constructor
 */
function MainContent({clientsList, filteredClientsList, showSelectedFeatures, featureStatus}: MainContentProps) {
    const filteredClientsListSize = filteredClientsList.length;
    const shownClients = filteredClientsListSize ? filteredClientsList : clientsList;

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
            <Typography variant="h6" component="h6">Mandanten</Typography>
            {filteredClientsListSize || clientsList.length} von {clientsList.length}
            <IDInfoButton align="right"/>
            {shownClients.map((client: Clients, index: number) => (
                client.hasFeatures && client.features && <Fade in key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" component="h2">
                                {client.name} ({client.id})
                            </Typography>
                            <Box sx={{display: "flex", flexWrap: "wrap"}}>
                                {showSelectedFeatures(client.features).map((feature:Feature, index:number) => (
                                    <Grow in key={index}>
                                        <IconButton component="div">
                                            <ApartmentIcon color={showFeatureStatus(feature.client)} />&nbsp;
                                            <AccountTreeIcon color={showFeatureStatus(feature.category)} />&nbsp;
                                            <LocalOfferIcon color={showFeatureStatus(feature.tag)} />&nbsp;
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
