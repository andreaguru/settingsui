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
        <FormControl sx={{m: 1, width: "90%"}}>
            <Typography component="label">Status der Features</Typography>
            <RadioGroup sx={{pl: 2}}
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={handleFeatureStatusChange}
                defaultValue=""
                name="radio-buttons-group">
                <FormControlLabel value="" control={<Radio color="info" size="small" />} label="keine Auswahl" />
                <FormControlLabel value="ACTIVE" control={<Radio color="info" size="small" />} label="aktiviert" />
                <FormControlLabel value="INACTIVE"
                    color="info"
                    control={<Radio size="small" />}
                    label="deaktiviert / nicht konfiguriert" />
            </RadioGroup>
        </FormControl>
    );
}

export default IDRadioGroup;
