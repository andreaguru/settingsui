import { use, useReducer, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Alert, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import typescript Interfaces
import { IdToggleProps } from "types/componentProps.types";
import { dateTimeFormatter, dialogHandler } from "utils/utils";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AccessTime from "@mui/icons-material/AccessTime";
import IDModalDialog from "components/shared/IDModalDialog";
import FormAddUsage from "components/detailPage/FormAddUsage";
import FeatureDetailContext from "context/FeatureDetailContext";
import { ExpandedConfigMethod } from "types/context.types";
import FormConfiguration from "./FormConfiguration";
import { deleteConfiguration, updateConfiguration } from "services/FeatureDetailAPI";
import EditIcon from "@mui/icons-material/Edit";
import { IChangeEvent } from "@rjsf/core";
import { FeaturesConfig } from "types/api.types";
import ModalButtonsContainer from "components/shared/ModalButtonsContainer";
import IDModalButton from "components/shared/IDModalButton";
import IDToggleWrapper from "components/shared/IDToggleWrapper";
import DeleteIcon from "@mui/icons-material/Delete";

import { isEqual } from "lodash";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
}

const ExpandMore = styled(IconButton, {
    shouldForwardProp: prop => prop !== "expand",
})<ExpandMoreProps>(({ expand, theme }) => ({
    transform: !expand ? "rotate(90deg)" : "rotate(270deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const IDCardActions = styled(CardActions)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(2),
    color: theme.palette.id_mediumGray.main,
    paddingTop: 0,
    ".modifiyDate": {
        display: "flex",
        gap: theme.spacing(1),
    },
}));

/**
 * The Ippen Digital Accordion component. Based on MUI Card Complex Interaction
 *
 * @constructor
 */
function Configuration({ config,
    disabled,
    jsonSchema,
    selected,
    setShowConfigRemovedAlert,
    toggleConfig }: IdToggleProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [openFormWindow, setOpenFormWindow] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { configExpanded, dispatchConfigExpanded, handleFeatureUpdate } = use(FeatureDetailContext);
    
    const { clientId, id, modified, name, settings } = config ?? {
        created: "",
        modified: "",
        name: "",
        id: 0,
        clientId: 0,
        settings: {},
    };

    const [formData, setFormData] = useState<Record<string, unknown>>(settings || {});

    const theme = useTheme();

    const configurationBase = {
        id,
        name,
        clientId,
        settings: {},
    };

    const [dialog, dispatch] = useReducer(dialogHandler, {
        openConfirmModal: false,
    });

    const isExpanded = configExpanded.includes(id);

    const handleExpandClick = () => {
        if (isExpanded) {
            dispatchConfigExpanded({ type: ExpandedConfigMethod.REMOVE, payload: id });
        } else {
            dispatchConfigExpanded({ type: ExpandedConfigMethod.ADD, payload: id });
        }
    };

    const modifieddDateformat = modified ? dateTimeFormatter(modified, "de-DE") : "";

    const handleFormClose = () => {
        setOpenFormWindow(false);
    };

    const handleFormOpen = () => {
        setOpenFormWindow(true);
    };

    // On Modal Window close, reset most of the states
    const handleConfirmClose = () => {
        dispatch({ type: "CLEAN_FLOW" });
    };

    // If Edit Mode, remove readonly and make Form Fields editable
    const handleEditMode = () => {
        // If the user made changes in the form without saving them, show the alert message
        if (editMode && !isEqual(formData, settings)) {
            dispatch({ type: "RESET_CONFIG", payload: true });
        } else {
            setEditMode(prevState => !prevState);
        }
    };

    // Reset Form Data
    const resetConfiguration = () => {
        setConfiguration({ ...configurationBase, settings });
        setFormData(settings || {});
        if (dialog.viewMode) {
            setEditMode(false);
        }
    };

    /* If the user confirms, update the data and returns a promise.
    If there is an error, show the dialog with Error Message */
    const editConfiguration = () => {
        updateConfiguration(configuration)
            .then(() => {
                handleFeatureUpdate();
                setEditMode(false);
            })
            .catch(() => {
                dispatch({ type: "SERVER_ERROR" });
            });
    };

    const handleRemoveConfiguration = (configurationId: number) => {
        if (configurationId) {
            // Remove the current configuration and re-render the component.
            deleteConfiguration(configurationId)
                .then(() => handleFeatureUpdate())
                .then(() => setShowConfigRemovedAlert(true))
                .catch(() => {
                    dispatch({ type: "SERVER_ERROR" });
                });
        }
    };

    const handleFormChange = (event: IChangeEvent) => {
        if (event.formData) {
            setFormData(event.formData as Record<string, unknown>);
        }
    };

    const saveAndClose = () => {
        switch (dialog.action) {
            case "delete":
                handleRemoveConfiguration(id);
                break;
            case "edit":
                editConfiguration();
                break;
            case "reset":
                resetConfiguration();
                break;
        }
        handleConfirmClose();
    };

    // On form submit, show the Modal Window with the confirmation message
    const submitForm = (event: IChangeEvent) => {
        if (event.formData) {
            setConfiguration({
                ...configurationBase,
                settings: event.formData as Record<string, unknown>,
            });
            dispatch({ type: "EDIT_CONFIG" });
        }
    };

    // set the state with the initial form value and use it in formValue prop
    const [configuration, setConfiguration] =
        useState<FeaturesConfig>(() => ({ ...configurationBase, settings }));

    return (
        <IDToggleWrapper data-testid="toggle" className={`${disabled ? "Mui-disabled" : ""}`}>
            <Box
                className={`${selected ? "Mui-selected" : ""}`}
                onClick={event => toggleConfig(event, name)}
            >
                <CardHeader title={name} slotProps={{ title: { variant: "subtitle2" } }} />
                <IDCardActions>
                    <Box className="modifiyDate">
                        <AccessTime fontSize="small" />
                        <Typography variant="caption">{modifieddDateformat}</Typography>
                    </Box>
                    <Box>
                        {isExpanded && jsonSchema &&
                            <IconButton>
                                <EditIcon
                                    data-testid="editConfig"
                                    onClick={handleEditMode}
                                    color={editMode ? "id_mediumGray" : "primary"} />
                            </IconButton>
                        }
                        <IconButton onClick={() => dispatch({ type: "DELETE_CONFIG" })}>
                            <DeleteIcon data-testid="deleteConfig" />
                        </IconButton>
                        <ExpandMore
                            expand={isExpanded}
                            onClick={handleExpandClick}
                            aria-expanded={isExpanded}
                            aria-label="show more"
                            className="toggleButton"
                            data-testid="toggleButton"
                        >
                            <ArrowForwardIos fontSize="small" />
                        </ExpandMore> 
                    </Box>
                </IDCardActions>
            </Box>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        gap: 3,
                        alignSelf: "stretch",
                    }}
                    data-testid="collapsedContent"
                >
                    <Divider sx={{ width: "100%" }} />
                    {showSuccessMessage && (
                        <Alert
                            severity="success"
                            variant="outlined"
                            onClose={() => {
                                setShowSuccessMessage(false);
                            }}
                        >
                            Sie haben die neue Usage erfolgreich angelegt.
                        </Alert>
                    )}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick={() => handleFormOpen()}
                    >
                        Usage
                    </Button>
                    {/* We use React Json Schema Form to render the form, based on the jsonSchema property */}
                    {jsonSchema && (
                        <Grid container>
                            <FormConfiguration
                                jsonSchema={jsonSchema}
                                id={id}
                                clientId={clientId}
                                name={name}
                                settings={settings}
                                editMode={editMode}
                                formData={formData}
                                submitForm={submitForm}
                                handleFormChange={handleFormChange}
                                showResetDialog={() => dispatch({ type: "RESET_CONFIG" })}
                            />
                        </Grid>
                    )}
                </CardContent>
                <IDModalDialog
                    modalOpen={openFormWindow}
                    handleClose={handleFormClose}
                    titleText="Usage für Konfiguration anlegen"
                >
                    <FormAddUsage
                        configId={id}
                        closeModal={handleFormClose}
                        setShowSuccessMessage={setShowSuccessMessage}
                    />
                </IDModalDialog>
            </Collapse>
            <IDModalDialog
                modalOpen={dialog.openConfirmModal}
                handleClose={handleConfirmClose}
                descriptionText={dialog.description}
                modalWidth={`${theme.spacing(50)}px`}
            >
                <ModalButtonsContainer>
                    {/* code for the buttons is passed directly as children,
                        as there is a lot of customization */}
                    {dialog.action === "error" ?
                        (
                            // in case of error, we show only one button
                            // which has no other action apart from handleConfirmClose.
                            <IDModalButton onClick={handleConfirmClose}>Okay</IDModalButton>
                        ) :
                        (
                            <>
                                <IDModalButton color="secondary" onClick={handleConfirmClose}>
                                    Weitermachen
                                </IDModalButton>
                                <IDModalButton
                                    color={dialog.action === "reset" ? "error" : "primary"}
                                    onClick={() => saveAndClose()}
                                >
                                    {dialog.button}
                                </IDModalButton>
                            </>
                        )}
                </ModalButtonsContainer>
            </IDModalDialog>
        </IDToggleWrapper>
    );
}

export default Configuration;
