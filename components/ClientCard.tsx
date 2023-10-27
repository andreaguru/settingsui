import React, {useState} from "react";
import {alpha, Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import Divider from "@mui/material/Divider";
import {styled, useTheme} from "@mui/material/styles";
import {Theme} from "@mui/system";
import {useInView} from "react-intersection-observer";
import NextLink from "next/link";

// import typescript Interfaces
import {Feature} from "../types/api.types";
import {ClientCardProps, IDDividerProps} from "../types/componentProps.types";
import {useRouter} from "next/router";

// import utils
import {getIconColorByStatus} from "../utils/utils";

/**
 * getButtonColorByStatus - return the right color of text and background according to feature client status
 * @param {string} status
 * @param {Theme} theme
 * @return {string}
 */
function getButtonColorByStatus(status:string, theme:Theme) {
    switch (status) {
    case "ENABLED":
        return {bgColor: theme.palette.id_green.light, color: theme.palette.id_green.main};
    case "DISABLED":
    case "NONE":
        return {bgColor: theme.palette.id_mediumGray.light, color: theme.palette.id_mediumGray.main};
    default:
        return {bgColor: theme.palette.id_mediumGray.light, color: theme.palette.id_mediumGray.main};
    }
}

const IDDivider = styled(Divider, {
    shouldForwardProp: (prop) => prop !== "marginTop",
})<IDDividerProps>(({theme, marginTop}) => ({
    "fontSize": theme.typography.body2.fontSize,
    "color": theme.palette.secondary.light,
    "marginTop": marginTop || theme.spacing(2),
    "&:before": {
        "display": "none",
    },
    "&:after": {
        "alignSelf": "normal",
        "marginTop": "13px",
        "width": "45%",
    },
    "& .MuiDivider-wrapper": {
        "paddingLeft": 0,
    },
}));

/**
 * CliendCard component. It accepts 3 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 * @constructor
 */
function ClientCard({
    client,
    showSelectedFeatures,
}: ClientCardProps) {
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

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const universalFeaturesMap = showSelectedFeatures(client.features, true);
    const featuresMap = showSelectedFeatures(client.features);

    const getFeatureContent = (feature: Feature, index: number) => {
        // set background color of the button according to feature client status
        const clientColor = getButtonColorByStatus(feature.status.client, theme).bgColor;

        return <div data-testid="feature" key={index}>
            {inView && <NextLink
                passHref
                href={{
                    pathname: `/feature/${client.id}/${feature.key}`,
                    /* pass the current query params to the next page
                                            (filteredClients and filteredFeatures, if present) */
                    query: router && router.query,
                }}
                style={{"textDecoration": "none"}}
            >
                <Fade in>
                    <IconButton className="iconStatus"
                        style={{
                            "color": getButtonColorByStatus(feature.status.client, theme).color,
                            "backgroundColor": hover ? alpha(clientColor, 0.7) : clientColor,
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Typography variant="subtitle2" lineHeight={1}>
                            {feature.name}
                        </Typography>
                        <CategoryIcon fontSize="small"
                            color={getIconColorByStatus(feature.status.category)}/>
                        <TagIcon fontSize="small"
                            color={getIconColorByStatus(feature.status.tag)}/>
                    </IconButton>
                </Fade>
            </NextLink>}
        </div>;
    };

    return (
        <Card
            data-testid={client.id}
            id={String(`id-clt-${client.id}`)}
            ref={ref}
            sx={{
                minHeight: theme.spacing(22), // same height as Skeleton placeholder in MainContent
                mb: theme.spacing(4),
            }}
        >
            <CardContent>
                <Typography variant="subtitle1"
                    sx={{display: "flex", alignItems: "center", gap: theme.spacing(1)}}>
                    <Typography fontSize="18px" fontWeight="medium">
                        {client.name}
                    </Typography>
                    <Typography color="secondary.light">| {client.id}</Typography>
                </Typography>
                { universalFeaturesMap && universalFeaturesMap.length > 0 &&
                    <>
                        <IDDivider textAlign="left">Allgemein</IDDivider>
                        <Box sx={{display: "flex", flexWrap: "wrap"}}>
                            {
                                universalFeaturesMap.map((feature: Feature, index: number) =>
                                    getFeatureContent(feature, index)
                                )
                            }
                        </Box>
                    </>
                }
                { featuresMap && featuresMap.length > 0 &&
                    <>
                        <IDDivider textAlign="left" marginTop={theme.spacing(3)}>Features</IDDivider>
                        <Box sx={{display: "flex", flexWrap: "wrap"}}>
                            {
                                featuresMap.map((feature: Feature, index: number) =>
                                    getFeatureContent(feature, index)
                                )
                            }
                        </Box>
                    </>
                }
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
