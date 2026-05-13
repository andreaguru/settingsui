import { ReactElement, use, useState } from "react";
import { FormAddConfigurationProps } from "types/componentProps.types";
import { AppContext } from "context/AppContext";
import FeatureDetailContext from "context/FeatureDetailContext";
import Button from "@mui/material/Button";
import { FeaturesConfig } from "types/api.types";
import getUiSchema from "utils/RJSFSchema";
import validator from "@rjsf/validator-ajv8";
import ArrayFieldTemplate from "components/detailPage/ArrayFieldTemplate";
import ArrayFieldItemTemplate from "components/detailPage/ArrayFieldItemTemplate";
import IDForm from "components/shared/IDForm";
import ModalButtonsContainer from "components/shared/ModalButtonsContainer";
import { RJSFSchema } from "@rjsf/utils";
import { JSONSchema7Definition } from "json-schema";
import { IChangeEvent } from "@rjsf/core";
import { createConfiguration } from "services/FeatureDetailAPI";
import { ExpandedConfigMethod } from "types/context.types";
import { Alert } from "@mui/material";

/**
 * Function to render a form for adding configuration based on the provided JSON schema.
 *
 * @param {FormAddConfigurationProps.jsonSchema} jsonSchema - The JSON schema for the configuration form
 * @param {FormAddConfigurationProps.closeModal} closeModal - The function to close the form modal
 *
 * @return {ReactElement} Rendered form component for adding configuration
 */
function FormAddConfiguration({ closeModal, jsonSchema }: FormAddConfigurationProps): ReactElement {
    const { clientIdInView } = use(AppContext);
    const [errorType, setErrorType] = useState<string | undefined>();
    const { dispatchConfigExpanded, featureId, handleFeatureUpdate } = use(FeatureDetailContext);

    const configProperties: Record<string, JSONSchema7Definition> = {
        // We need to group the first three properties into a wrapper,
        // in order to manage them as a group from layout perspective.
        configFixedInfosWrapper: {
            type: "object",
            properties: {
                configName: {
                    type: "string",
                    title: "Konfiguration Name",
                },
                clientId: {
                    type: "number",
                    title: "Client ID",
                    readOnly: true,
                },
                featureId: {
                    type: "number",
                    title: "Feature ID",
                    readOnly: true,
                },
            },
            required: ["configName", "clientId", "featureId"],
        },
        ...(jsonSchema?.properties ?? {}),
    };

    const configurationBase: RJSFSchema = {
        ...jsonSchema,
        properties: configProperties,
    };
    const [configSchema] = useState<RJSFSchema>(configurationBase);

    const formAction = (event: IChangeEvent) => {
        if (event.formData) {
            createConfiguration(event.formData as Record<string, unknown>)
                .then(response => {
                    if (response?.ok) {
                        return response.json();
                    }
                    // For any server error
                    throw new Error("Die Konfiguration wurde nicht hinzugefügt." +
                        " Versuchen Sie es noch einmal.");
                })
                .then((response: FeaturesConfig) => {
                    // We trigger the FeatureDetailContext in order to rerender all the children components.
                    handleFeatureUpdate();
                    // On form submit, we add the new configuration to the configExpanded Array,
                    // in order to show it opened in the sidebar
                    dispatchConfigExpanded({
                        type: ExpandedConfigMethod.ADD,
                        payload: response.id,
                    });
                    closeModal();
                })
                .catch((error: Error) => {
                    setErrorType(error.message);
                });
        }
    };

    return (
        <IDForm
            name="form-addConfiguration"
            schema={configSchema ?? {}}
            uiSchema={getUiSchema(true)}
            // We pass the already present data to the form
            formData={{
                configFixedInfosWrapper: {
                    clientId: clientIdInView,
                    featureId,
                },
            }}
            onSubmit={formAction}
            validator={validator}
            // we need to use a custom template for arrays as we have many CSS customizations
            templates={{ ArrayFieldTemplate, ArrayFieldItemTemplate }}
        >
            {errorType && (
                <Alert
                    severity="error"
                    data-testid="errorMessage"
                    variant="outlined"
                    onClose={() => setErrorType(undefined)}
                >
                    {errorType}
                </Alert>
            )}
            <ModalButtonsContainer>
                <Button color="primary" onClick={closeModal}>
                    Abbrechen
                </Button>
                <Button type="submit" data-testid="submit" variant="contained">
                    Speichern
                </Button>
            </ModalButtonsContainer>
        </IDForm>
    );
}

export default FormAddConfiguration;
