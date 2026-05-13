import { ChangeEvent, ReactElement, use, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { FormAddUsageProps } from "types/componentProps.types";
import { createUsage } from "services/FeatureDetailAPI";
import { AppContext } from "context/AppContext";
import FeatureDetailContext from "context/FeatureDetailContext";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { TableView } from "types/api.types";
import { ActiveTab } from "types/context.types";
import ModalButtonsContainer from "components/shared/ModalButtonsContainer";

function FormAddUsage({ closeModal, configId, setShowSuccessMessage }: FormAddUsageProps): ReactElement {
    const [levelId, setLevelId] = useState<number | "">("");
    const [errorType, setErrorType] = useState<string | undefined>();
    const { activeTab, handleUsageUpdate, setActiveTab } = use(FeatureDetailContext);
    const [level, setLevel] = useState<ActiveTab>(activeTab);
    const { clientIdInView } = use(AppContext);
    const theme = useTheme();

    const formAction = (formData: FormData) => {
        return createUsage(formData)
            .then(response => {
                if (response?.ok) {
                    handleUsageUpdate();
                    setActiveTab(prevActiveTab => ({
                        ...prevActiveTab,
                        ...level,
                    }));
                    closeModal();
                    setShowSuccessMessage(true);
                } else {
                    // Custom message for failed HTTP codes
                    if (response?.status === 500) {
                        throw new Error("Für diesen Mandanten wurde bereits eine Usage angelegt.");
                    }
                    // For any other server error
                    throw new Error("Die Usage wurde nicht hinzugefügt. Versuchen Sie es noch einmal.");
                }
            })
            .catch((error: Error) => {
                setErrorType(error.message);
            });
    };
    const handleChange = (event: SelectChangeEvent<TableView>) => {
        const tableViewList = Object.values(TableView);
        const levelName = event.target.value;
        setLevel(prevState => ({
            ...prevState,
            index: tableViewList.indexOf(levelName),
            name: levelName,
        }));
    };

    const handleLevelIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLevelId(event.target.value !== "" ? parseInt(event.target.value, 10) : "");
    };

    return (
        <form
            action={formAction}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(3),
            }}
        >
            <TextField
                required
                size="small"
                name="configurationId"
                label="Konfiguration"
                value={configId}
                slotProps={{
                    htmlInput: { readOnly: true },
                }}
                className="readOnly"
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ebene</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    name="level"
                    value={level.name}
                    label="Ebene"
                    onChange={handleChange}
                    size="small"
                    required
                >
                    <MenuItem value={TableView.CLIENT}>Mandant</MenuItem>
                    <MenuItem value={TableView.CATEGORY}>Kategorie</MenuItem>
                    <MenuItem value={TableView.TAG}>Tag</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                name={`${level.name}-id`}
                label={`${level.name}-ID`}
                type="number"
                onChange={handleLevelIdChange}
                size="small"
                value={level.name === TableView.CLIENT ? clientIdInView : levelId}
                slotProps={{
                    htmlInput: { readOnly: level.name === TableView.CLIENT },
                }}
                className={level.name === TableView.CLIENT ? "readOnly" : ""}
            />

            {level.name === TableView.TAG && (
                <TextField
                    required
                    name="client-id"
                    label="client-ID"
                    type="number"
                    size="small"
                    value={clientIdInView}
                    slotProps={{
                        htmlInput: { readOnly: true },
                    }}
                    className="readOnly"
                />
            )}

            <Typography variant="body1">Soll diese Usage nach dem Speichern bereits aktiv sein?</Typography>
            <Switch defaultChecked size="medium" name="status" />

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
        </form>
    );
}

export default FormAddUsage;
