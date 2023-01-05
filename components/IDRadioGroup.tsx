import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

// import typescript Interfaces
import {IDRadioGroupProps} from "../types/componentProps.types";

/**
 *
 * @constructor
 */
function IDRadioGroup({handleFeatureStatusChange}:IDRadioGroupProps) {
    return (
        <FormControl>
            <Typography component="label">Status der Features</Typography>
            <RadioGroup sx={{pl: 2}}
                onChange={handleFeatureStatusChange}
                name="radio-buttons-group">
                <FormControlLabel value=""
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">keine Auswahl</Typography>} />
                <FormControlLabel value="ACTIVE"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">aktiviert</Typography>} />
                <FormControlLabel value="INACTIVE"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">deaktiviert / nicht konfiguriert</Typography>} />
            </RadioGroup>
        </FormControl>
    );
}

export default IDRadioGroup;
