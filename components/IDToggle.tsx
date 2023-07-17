import {useState} from "react";
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
import Link from "@mui/material/Link";
import {Divider, ListItem} from "@mui/material";
import {IdToggleProps} from "../types/componentProps.types";
import List from "@mui/material/List";

interface ExpandMoreProps extends IconButtonProps {
  $expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    // we need to extract the $expand property from props as it cannot be passed directly to IconButton component.
    // That's why we also need to disable eslint, in order to not get an "unused variable" error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {$expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, $expand}) => ({
    transform: !$expand ? "rotate(90deg)" : "rotate(270deg)",
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
    ".MuiListItem-root": {
        display: "block",
        lineHeight: 1,
    },
}));

const IDCardActions = styled(CardActions)(({theme}) => ({
    "paddingLeft": theme.spacing(2),
    "gap": 1,
    "& > :last-child": {
        "marginLeft": "auto",
    },
}));

/**
 * The Ippen Digital Accordion component. Based on MUI Card Complex Interaction
 *
 * @constructor
 */
function IDToggle({disabled}: IdToggleProps) {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <IDToggleWrapper data-testid="toggle" className={disabled ? "Mui-disabled" : ""}>
            <CardHeader
                title="auto"
                titleTypographyProps={{variant: "subtitle2"}}
                sx={{pb: 0}}
            />
            <IDCardActions>
                <Typography variant="caption">Erstellt 10.02.2023</Typography>
                <Typography variant="caption">Zuletz geändert 13.02.2023</Typography>
                <ExpandMore
                    // a ternary operator syntax is needed since a warning is triggered
                    // when trying to pass a boolean value to a custom property
                    $expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    disabled={disabled}
                >
                    <ArrowForwardIos fontSize="small" sx={{marginLeft: "auto"}} />
                </ExpandMore>
            </IDCardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{"pt": 0, "px": 2, "&:last-child": {pb: 2}}} data-testid="collapsedContent">
                    <Divider />
                    <Grid container sx={{pt: 2}}>
                        {/* <Grid item xs={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                            <Box>
                                <Typography variant="caption"
                                    color="secondary.light">label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption"
                                    color="secondary.light">label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption"
                                    color="secondary.light">label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                            <Box>
                                <Typography variant="caption"
                                    color="secondary.light">label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption"
                                    color="secondary.light">label</Typography>
                                <Typography variant="body2">value</Typography>
                            </Box>
                        </Grid>*/}

                        {/* header or footer layout */}
                        <List disablePadding>
                            <Typography variant="subtitle2">Logo</Typography>
                            <ListItem>
                                <Typography variant="body2">LOGO</Typography>
                            </ListItem>

                            <Typography variant="subtitle2">Featured</Typography>
                            <ListItem>
                                <Typography variant="body2">Rosenheim</Typography>
                                <Link variant="body2" color="text.secondary" href="#" underline="hover">Link</Link>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body2">Rosenheim</Typography>
                                <Link variant="body2" color="text.secondary" href="#" underline="hover">
                                    https://www.rosenheim24.de/rosenheim/
                                </Link>
                            </ListItem>

                            <Typography variant="subtitle2">Actions</Typography>
                            <ListItem>
                                <Typography variant="body2">SUCHE</Typography>
                                <Link variant="body2" color="text.secondary" href="#" underline="hover">Link</Link>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body2">Abo</Typography>
                                <Link variant="body2" color="text.secondary" href="#" underline="hover">Link</Link>
                            </ListItem>
                        </List>
                    </Grid>
                </CardContent>
            </Collapse>
        </IDToggleWrapper>
    );
}

export default IDToggle;
