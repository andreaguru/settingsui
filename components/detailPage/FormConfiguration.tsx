// RJSF Schema
import getUiSchema from "utils/RJSFSchema";

// MUI/Custom MUI Components
import Button from "@mui/material/Button";
import ArrayFieldTemplate from "components/detailPage/ArrayFieldTemplate";
import ArrayFieldItemTemplate from "components/detailPage/ArrayFieldItemTemplate";
import validator from "utils/IDValidator";

// Typescript Interfaces
import { IDFormProps } from "types/componentProps.types";
import IDForm from "components/shared/IDForm";

/**
 * Renders an FormConfiguration component.
 *
 */
function FormConfiguration({ ...props }: IDFormProps) {
    const { editMode, formData, handleFormChange, jsonSchema, name, showResetDialog, submitForm } = props;

    return (
        <IDForm
            name={`form-${name}`}
            schema={jsonSchema}
            // we pass a boolean to uiSchema in order to activate/deactivate the edit mode for arrays
            uiSchema={getUiSchema(editMode)}
            formData={formData}
            onSubmit={submitForm}
            onChange={handleFormChange}
            omitExtraData
            validator={validator}
            // we need to use a custom template for arrays as we have many CSS customizations
            templates={{ ArrayFieldTemplate, ArrayFieldItemTemplate }}
            readonly={!editMode}
        >
            {editMode && (
                <>
                    <Button
                        data-testid="resetForm"
                        variant="outlined"
                        onClick={() => showResetDialog()}
                        sx={{ mr: 2 }}
                        type="reset"
                    >
                        Zurücksetzen
                    </Button>
                    <Button variant="contained" type="submit">
                        Speichern
                    </Button>
                </>
            )}
        </IDForm>
    );
}

export default FormConfiguration;
