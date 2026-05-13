import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import { alpha, Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { use } from "react";
import { useInView } from "react-intersection-observer";

// import typescript Interfaces
import { AppContext } from "context/AppContext";
import { useFeaturesPerClient } from "services/DashboardAPI";
import { Feature } from "types/api.types";
import { ClientCardProps, IDDividerProps, MUIColorType } from "types/componentProps.types";

// import utils
import { getIconColorByStatus } from "utils/utils";
import edidTheme from "../themes/edid";
import IDLoader from "components/shared/IDLoader";

/**
 * getButtonColorByStatus - return the right color of text and background according to feature client status
 * @param {string} status
 * @return {string}
 */
function getButtonColorByStatus(status: string) {
    switch (status) {
        case "ENABLED":
            return {
                bgColor: edidTheme.palette.id_green.light,
                color: edidTheme.palette.id_green.main,
            };
        case "DISABLED":
        case "NONE":
            return {
                bgColor: edidTheme.palette.id_mediumGray.light,
                color: edidTheme.palette.id_mediumGray.main,
            };
        default:
            return {
                bgColor: edidTheme.palette.id_mediumGray.light,
                color: edidTheme.palette.id_mediumGray.main,
            };
    }
}

const IDDivider = styled(Divider, {
    shouldForwardProp: prop => prop !== "marginTop",
})<IDDividerProps>(({ marginTop, theme }) => ({
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.secondary.light,
    marginTop: marginTop ?? theme.spacing(2),
    "&:before": {
        display: "none",
    },
    "&:after": {
        alignSelf: "normal",
        marginTop: theme.spacing(1.5),
        width: "45%",
    },
    "& .MuiDivider-wrapper": {
        paddingLeft: 0,
    },
}));

interface IconStatusProps {
    color: string
    bgcolor: string
}

const ClientCardContainer = styled(Card)(({ theme }) => ({
    minHeight:
        theme.spacing(theme.custom.clientCardHeight), // same height as Skeleton placeholder in MainContent
    marginBottom: theme.spacing(4),
    position: "relative",
    ".MuiCardContent-root": {
        padding: theme.spacing(3),
    },
    ".MuiBox-root": {
        display: "flex",
        flexWrap: "wrap",
    },
    "a[href]": {
        display: "block",
        marginRight: theme.spacing(2),
        textDecoration: "none",
        marginTop: theme.spacing(2),
    },
}));

const ClientCardTitle = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}));

const IDIconStatus = styled(IconButton)<IconStatusProps>(({ bgcolor, color, theme }) => ({
    display: "flex",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: theme.spacing(0.5),
    gap: theme.spacing(1),
    color,
    backgroundColor: bgcolor,
    "&:hover": {
        boxShadow: "0 3px 3px rgb(0 0 0 / 12%)",
        backgroundColor: alpha(bgcolor, 0.7),
    },
}));

/**
 * Displays a client card with client information and features.
 */
function ClientCard({ client }: ClientCardProps) {
    const theme = useTheme();
    const { clientIdInView, showSelectedFeatures } = use(AppContext);

    /* We use react-intersection-observer in order to perform a lazy-rendering of the Features
    and increase dramatically the filtering performance
    inView tell us if an element, that matches the ref attribute, is inside the viewport */
    const [ref, inView] = useInView({
        /* Optional options */
        triggerOnce: true,
    });

    // get the features per client via a custom hook
    const features = useFeaturesPerClient(client.id, clientIdInView);
    const router = useRouter();

    // get the universal features (for instance header, footer)
    const universalFeaturesMap = showSelectedFeatures(features, true);

    // get the common features
    const featuresMap = showSelectedFeatures(features);

    const getFeatureContent = (feature: Feature) => {
        // set background color of the button according to feature client status
        const clientStatusColor = getButtonColorByStatus(feature.status.client).bgColor;

        return (
            <div data-testid="feature" key={feature.id}>
                {inView && (
                    <NextLink
                        href={{
                            pathname: `/feature/${client.id}/${feature.key}`,
                            /* pass the current query params to the next page
                                            (filteredClients and filteredFeatures, if present) */
                            query: router?.query,
                        }}
                    >
                        <Fade in>
                            <IDIconStatus
                                color={
                                    getButtonColorByStatus(feature.status.client).color as MUIColorType
                                }
                                bgcolor={clientStatusColor}
                            >
                                <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                                    {feature.name}
                                </Typography>
                                <CategoryIcon
                                    fontSize="small"
                                    sx={{
                                        color: getIconColorByStatus(feature.status.category),
                                    }}
                                />
                                <TagIcon
                                    fontSize="small"
                                    sx={{
                                        color: getIconColorByStatus(feature.status.tag),
                                    }}
                                />
                            </IDIconStatus>
                        </Fade>
                    </NextLink>
                )}
            </div>
        );
    };

    return (
        <ClientCardContainer data-testid={client.id} id={String(`id-clt-${client.id}`)} ref={ref}>
            <CardContent>
                <ClientCardTitle variant="subtitle1">
                    <Typography sx={{ fontSize: theme.typography.pxToRem(18), fontWeight: "medium" }}>
                        {client.name}
                    </Typography>
                    <Typography color="secondary.light">| {client.id}</Typography>
                </ClientCardTitle>
                {}
                {(featuresMap?.length === 0 && universalFeaturesMap?.length === 0) && <IDLoader />}
                {universalFeaturesMap && universalFeaturesMap.length > 0 && (
                    <>
                        <IDDivider textAlign="left">Allgemein</IDDivider>
                        <Box>
                            {universalFeaturesMap.map((feature: Feature) => getFeatureContent(feature))}
                        </Box>
                    </>
                )}
                {featuresMap && featuresMap.length > 0 && (
                    <>
                        <IDDivider textAlign="left" marginTop={theme.spacing(3)}>
                            Features
                        </IDDivider>
                        <Box>
                            {
                                /* First we sort the array alphabetically, then we go through the map */
                                featuresMap
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((feature: Feature) => getFeatureContent(feature))
                            }
                        </Box>
                    </>
                )}
            </CardContent>
        </ClientCardContainer>
    );
}

export default ClientCard;

/* start-test-block */
export { getIconColorByStatus, getButtonColorByStatus };
/* end-test-block */
