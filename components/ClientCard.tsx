import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import {lighten} from "@mui/system/colorManipulator";
import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import {useTheme} from "@mui/material/styles";
import {Theme} from "@mui/system";
import {useInView} from "react-intersection-observer";
import NextLink from "next/link";

// import typescript Interfaces
import {Feature} from "../types/api.types";
import {ClientCardProps} from "../types/componentProps.types";
import {useRouter} from "next/router";

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
 * CliendCard component. It accepts 3 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 * @constructor
 */
function ClientCard({
    client,
    showSelectedFeatures}:ClientCardProps) {
    const theme = useTheme();

    /* We use react-intersection-observer in order to perform a lazy-rendering of the Features
    and increase dramatically the filtering performance */
    // inView tell us if an element, that matches the ref attribute, is inside the viewport
    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
        triggerOnce: true,
    });

    const router = useRouter();

    return (
        <Card
            data-testid={client.id}
            id={String(`id-clt-${client.id}`)}
            ref={ref}
            sx={{
                minHeight: "180px",
                margin: theme.variables.mainContentElementsMargin,
            }}>
            <CardContent>
                <Typography variant="body1" component="h2">
                    {client.name} ({client.id})
                </Typography>
                <Box sx={{display: "flex", flexWrap: "wrap"}}>
                    {showSelectedFeatures(client.features).map((feature:Feature, index:number) => {
                        // set background color of the button according to feature client status
                        const clientColor = getButtonColorByStatus(feature.client, theme).bgColor;

                        return <div key={index}>
                            { /* show a featureButton only if it is inside the viewport */
                                inView && <NextLink
                                    href={{
                                        pathname: `/feature/${client.id}/${feature.name}`,
                                        /* pass the current query params to the next page
                                        (filteredClients and filteredFeatures, if present) */
                                        query: router.query,
                                    }}
                                >
                                    <Fade in>
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
                                    </Fade>
                                </NextLink>}
                        </div>;
                    })}
                </Box>
            </CardContent>
        </Card>
    );
}

export default ClientCard;

/* start-test-block */
export {
    getIconColorByStatus,
    getButtonColorByStatus,
};
/* end-test-block */
