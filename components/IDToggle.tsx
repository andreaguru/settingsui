import {useState} from "react";
import {styled, useTheme} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import {IdToggleProps} from "../types/componentProps.types";

interface ExpandMoreProps extends IconButtonProps {
  expand?: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? "rotate(90deg)" : "rotate(270deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const IDToggleWrapper = styled(Card)(({theme}) => ({
    "flexBasis": "100%",
    "&.Mui-disabled": {
        opacity: .6,
        backgroundColor: theme.palette.grey[200],
        pointerEvents: "none",
    },
}));

/**
 * The Ippen Digital Accordion component. Based on MUI Card Complex Interaction
 *
 * @constructor
 */
function IDToggle({disabled}: IdToggleProps) {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const handleExpandClick = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <IDToggleWrapper className={disabled ? "Mui-disabled" : ""}>
            <CardHeader
                title="auto"
                titleTypographyProps={{variant: "subtitle2"}}
                sx={{pb: 0}}
            />
            <CardActions sx={{p: 2, pt: 1, gap: 1}}>
                <Typography variant="caption">Erstellt 10.02.2023</Typography>
                <Typography variant="caption">Zuletz geändert 13.02.2023</Typography>
                <ExpandMore
                    // a ternary operator syntax is needed since a warning is triggered
                    // when trying to pass a boolean value to a custom property
                    expand={expanded ? "true" : undefined}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ArrowForwardIos fontSize="small" />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{"pt": 0, "px": 2, "&:last-child": {pb: 2}}}>
                    <Divider />
                    <Grid container sx={{pt: 2}}>
                        <Grid item xs={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                            <Box>
                                <Typography variant="caption" color={theme.palette.neutral.main}>label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color={theme.palette.neutral.main}>label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color={theme.palette.neutral.main}>label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                            <Box>
                                <Typography variant="caption" color={theme.palette.neutral.main}>label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color={theme.palette.neutral.main}>label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </IDToggleWrapper>
    );
}

export default IDToggle;
