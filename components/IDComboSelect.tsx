import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import {SyntheticEvent} from "react";

// import typescript Interfaces
import {ClientOrFeature} from "../types/api.types";
import {IDComboSelectProps} from "../types/componentProps.types";

/**
 * The Ippen Digital ComboSelect component. Based on MUI Autocomplete, it accepts 5 properties:
 * values: the list of options that have to be shown
 * title: the label of the combo box
 * placeholder: the title at the top of the Component
 * setFilteredValues: the setter Method used to update the values
 * showId: used to show extra infos (in brackets) after each option
 *
 * @constructor
 */
function IDComboSelect({values, title, placeholder, filteredValues, setFilteredValues, showId}: IDComboSelectProps) {
    const handleChange = (event: SyntheticEvent, value: Array<ClientOrFeature>) => {
        setFilteredValues(value);
    };

    return (
        <FormControl>
            <Typography component="label">{title}</Typography>
            {values.length > 0 && (
                <Autocomplete
                    multiple
                    options={values}
                    value={filteredValues}
                    onChange={handleChange}
                    data-testid="combobox"
                    disableCloseOnSelect={true}
                    isOptionEqualToValue={
                        (option: ClientOrFeature, value: ClientOrFeature) => option.name === value.name
                    }
                    getOptionLabel={(option: ClientOrFeature) => option.name}
                    ListboxProps={{style: {maxHeight: "calc(100vh - 320px)"}}}
                    renderOption={(props, option: ClientOrFeature, {selected}) => (
                        <li {...props}>
                            <Checkbox
                                data-testid={"id" in option ? `checkbox-${option.id}` : ""}
                                style={{marginRight: 8}} checked={selected} size="small" />
                            {option.name + (showId ? ` (${"id" in option ? option.id : ""})` : "")}
                        </li>
                    )}
                    getOptionDisabled={(option) => ("hasFeatures" in option ? !option.hasFeatures : false)}
                    renderInput={(params) => <TextField {...params} placeholder={placeholder} variant="standard" />}
                />
            )}
        </FormControl>
    );
}

export default IDComboSelect;
