import FormControl from "@mui/material/FormControl";
import {Clients} from "../types/api.types";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import {IDComboSelectProps} from "../types/componentProps.types";
import Typography from "@mui/material/Typography";
import {SyntheticEvent} from "react";

/**
 *
 * @constructor
 */
function IDComboSelect({values, placeholder, filteredValues, setFilteredValues, showDetailInfo}: IDComboSelectProps) {
    const handleChange = (event: SyntheticEvent, value:Clients[]) => {
        // check if the selected element is a React Node element and if contains a value inside its props
        setFilteredValues(value);
    };

    return (
        <List component="nav">
            <FormControl sx={{m: 1, width: "90%"}}>
                <Typography component="h2" sx={{mb: 2}}>{placeholder}</Typography>
                {values.length > 0 && (
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={values}
                        value={filteredValues}
                        onChange={handleChange}
                        data-testid="combobox"
                        disableCloseOnSelect
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, {selected}) => (
                            <li {...props}>
                                <Checkbox
                                    data-testid={option.id}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {option.name + (showDetailInfo ? ` (${option.id})` : "")}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Select a value" variant="standard" />
                        )}
                    />
                )}
            </FormControl>
        </List>
    );
}

export default IDComboSelect;
