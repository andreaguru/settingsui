import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import {SyntheticEvent} from "react";

// import typescript Interfaces
import {ClientOrFeatureList} from "../types/api.types";
import {IDComboSelectProps} from "../types/componentProps.types";

/**
 * The Ippen Digital ComboSelect component. Based on MUI Autocomplete, it accepts 4 properties:
 * values: the list of options that have to be shown
 * placeholder: the title at the top of the Component
 * setFilteredValues: the setter Method used to update the values
 * showId: used to show extra infos (in brackets) after each option
 *
 * @constructor
 */
function IDComboSelect({values, title, placeholder, setFilteredValues, checkIfHasFeatures, showId}: IDComboSelectProps) {
    const handleChange = (event: SyntheticEvent, value:ClientOrFeatureList[]) => {
        // check if the selected element is a React Node element and if contains a value inside its props
        setFilteredValues(value);
    };

    return (
        <FormControl>
            <Typography component="label">{title}</Typography>
            {values.length > 0 && (
                <Autocomplete
                    multiple
                    options={values}
                    onChange={handleChange}
                    data-testid="combobox"
                    disableCloseOnSelect={true}
                    isOptionEqualToValue={(option:ClientOrFeatureList, value:ClientOrFeatureList) => option.name === value.name}
                    getOptionLabel={(option:ClientOrFeatureList) => option.name}
                    ListboxProps={{style: {maxHeight: "calc(100vh - 320px)"}}}
                    renderOption={(props, option:ClientOrFeatureList, {selected}) => (
                        <li {...props} >
                            <Checkbox
                                data-testid={option.id}
                                style={{marginRight: 8}}
                                checked={selected}
                                size="small"
                            />
                            {option.name + (showId ? ` (${option.id})` : "")}
                        </li>
                    )}
                    getOptionDisabled={(option) =>
                        checkIfHasFeatures === true && !option.hasFeatures
                    }
                    renderInput={(params) => (
                        <TextField {...params} placeholder={placeholder} variant="standard" />
                    )}
                />
            )}
        </FormControl>
    );
}

export default IDComboSelect;
