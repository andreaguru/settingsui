import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {IDRadioGroupProps} from "../types/componentProps.types";
/**
 *
 * @constructor
 */
function IDRadioGroup({handleFeatureStatusChange}:IDRadioGroupProps) {
    return (
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={handleFeatureStatusChange}
            name="radio-buttons-group">
            <FormControlLabel value={true} control={<Radio />} label="Aktiv" />
            <FormControlLabel value={false} control={<Radio />} label="Inaktiv" />
        </RadioGroup>
    );
}

export default IDRadioGroup;
