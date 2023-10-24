import {Fragment, useState} from "react";
import validator from "@rjsf/validator-ajv8";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import {Divider} from "@mui/material";
import IDForm from "./IDForm";
import {uiSchema} from "../utils/RJSFSchema";
import Box from "@mui/material/Box";

// import typescript Interfaces
import {IdToggleProps} from "../types/componentProps.types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "expand",
})<ExpandMoreProps>(({theme, expand}) => ({
    transform: !expand ? "rotate(90deg)" : "rotate(270deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const IDToggleWrapper = styled(Card)(({theme}) => ({
    "flexBasis": "100%",
    "cursor": "pointer",
    "&.Mui-disabled": {
        opacity: .6,
        backgroundColor: theme.palette.grey[200],
        pointerEvents: "none",
    },
    ".MuiBox-root": {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 6px 0px",
        },
        "&.Mui-selected": {
            "backgroundColor": theme.palette.primary.main,
            "color": "white",
            ".MuiButtonBase-root": {
                color: "white",
            },
        },
    },
    ".MuiList-root": {
        "h6": {
            "marginTop": theme.spacing(2),
            "marginBottom": theme.spacing(1),
            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
    ".MuiListItem-root": {
        display: "block",
        wordWrap: "break-word",
        lineHeight: 1,
    },
}));

const IDCardActions = styled(CardActions)(({theme}) => ({
    "paddingLeft": theme.spacing(2),
    "paddingTop": 0,
    "& > :last-child": {
        "marginLeft": "auto",
    },
}));

/**
 * The Ippen Digital Accordion component. Based on MUI Card Complex Interaction
 *
 * @constructor
 */
function IDToggle({disabled, selected, config, toggleConfig, jsonSchema}: IdToggleProps) {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded((prev) => !prev);
    };
    const {
        name,
        settings,
    } = config ?? {
        name: "",
        settings: [],
    };

    return (
        <IDToggleWrapper data-testid="toggle"
            className={`${disabled ? "Mui-disabled" : ""}`}
            onClick={(event) => toggleConfig(event, name)}>
            <Box className={`${selected ? "Mui-selected" : ""}`}>
                <CardHeader
                    title={name}
                    titleTypographyProps={{variant: "subtitle2"}}
                    sx={{pb: 0}}
                />
                <IDCardActions>
                    {/* TODO: we need real data to show here (creation and update date of the config) */}
                    <Typography variant="caption">Erstellt 10.02.2023</Typography>
                    <Typography variant="caption">Zuletz geändert 13.02.2023</Typography>
                    <ExpandMore
                    // a ternary operator syntax is needed since a warning is triggered
                    // when trying to pass a boolean value to a custom property
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        className="toggleButton"
                        disabled={disabled}
                    >
                        <ArrowForwardIos fontSize="small" sx={{marginLeft: "auto"}} />
                    </ExpandMore>
                </IDCardActions>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent
                    sx={{"pt": 0, "px": 2, "bgcolor": "white", "&:last-child": {pb: 2}}}
                    data-testid="collapsedContent">
                    <Divider />
                    <Grid container sx={{pt: 2}}>
                        <IDForm
                            schema={jsonSchema}
                            uiSchema={uiSchema}
                            formData={settings}
                            validator={validator} readonly>
                            {/* Fragment allows us to not show the submit button */}
                            <Fragment/>
                        </IDForm>
                    </Grid>
                </CardContent>
            </Collapse>
        </IDToggleWrapper>
    );
}

export default IDToggle;
