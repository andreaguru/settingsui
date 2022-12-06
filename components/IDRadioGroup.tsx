import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {ChangeEvent, useState} from "react";
/**
 *
 * @constructor
 */
function IDRadioGroup() {
    const [featureStatus, setFeatureStatus] = useState("active");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFeatureStatus((event.target as HTMLInputElement).value);
    };

    return (
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={featureStatus}
            onChange={handleChange}
            name="radio-buttons-group">
            <FormControlLabel value="active" control={<Radio />} label="Aktiv" />
            <FormControlLabel value="inactive" control={<Radio />} label="Inaktiv" />
        </RadioGroup>
    );
}

export default IDRadioGroup;
