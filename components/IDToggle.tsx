import {useState} from "react";
import validator from "@rjsf/validator-ajv8";
import {schemaArray, schemaObject, uiSchema} from "../utils/RJSFSchema";
import Form from "@rjsf/mui";
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
import {Divider, FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {IdToggleProps} from "../types/componentProps.types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    // we need to extract the expand property from props as it cannot be passed directly to IconButton component.
    // That's why we also need to disable eslint, in order to not get an "unused variable" error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {expand, ...other} = props;
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
function IDToggle({disabled, featureKey, config}: IdToggleProps) {
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
        <IDToggleWrapper data-testid="toggle" className={disabled ? "Mui-disabled" : ""}>
            <CardHeader
                title={name}
                titleTypographyProps={{variant: "subtitle2"}}
                sx={{pb: 0}}
            />
            <IDCardActions>
                <Typography variant="caption">Erstellt 10.02.2023</Typography>
                <Typography variant="caption">Zuletz geändert 13.02.2023</Typography>
                <ExpandMore
                    // a ternary operator syntax is needed since a warning is triggered
                    // when trying to pass a boolean value to a custom property
                    expand={expanded}
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
                        {config?.name === "dfb_gws" &&
                        <Form
                            schema={schemaArray}
                            uiSchema={uiSchema}
                            validator={validator}
                            onSubmit={(data) => console.log(data)} />
                        }

                        {config?.name === "daily" &&
                        <Form
                            schema={schemaObject}
                            uiSchema={uiSchema}
                            validator={validator}
                            onSubmit={(data) => console.log(data)} />
                        }

                        {config?.name === "Einfach Tasty" &&
                          <form
                              title="Header"
                              onSubmit={(event) => {
                                  event.preventDefault();
                                  console.log(event.target);
                              }}>
                              <Typography>Header</Typography>
                              <FormGroup>
                                  <TextField
                                      style={{width: "200px", margin: "5px"}}
                                      type="text"
                                      label="Logo"
                                      variant="outlined"
                                  />
                                  <FormGroup sx={{paddingLeft: 3}}>
                                      <TextField
                                          style={{width: "200px", margin: "5px"}}
                                          type="text"
                                          label="Url"
                                          variant="outlined"
                                      />
                                      <TextField
                                          style={{width: "200px", margin: "5px"}}
                                          type="text"
                                          label="Name"
                                          variant="outlined"
                                      />
                                  </FormGroup>
                                  <FormGroup sx={{paddingLeft: 3}}>
                                      <TextField
                                          style={{width: "200px", margin: "5px"}}
                                          type="text"
                                          label="Url"
                                          variant="outlined"
                                      />
                                      <TextField
                                          style={{width: "200px", margin: "5px"}}
                                          type="text"
                                          label="Name"
                                          variant="outlined"
                                      />
                                  </FormGroup>
                              </FormGroup>
                              <br />
                              <TextField
                                  style={{width: "200px", margin: "5px"}}
                                  type="text"
                                  label="Featured"
                                  variant="outlined"
                              />
                              <br />
                              <Button type="submit" variant="contained" color="primary">
                              submit
                              </Button>
                          </form>
                        }
                    </Grid>
                </CardContent>
            </Collapse>
        </IDToggleWrapper>
    );
}

export default IDToggle;
