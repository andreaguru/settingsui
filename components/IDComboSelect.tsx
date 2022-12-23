import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import {SyntheticEvent} from "react";

// import typescript Interfaces
import {Clients} from "../types/api.types";
import {IDComboSelectProps} from "../types/componentProps.types";

/**
 * The Ippen Digital ComboSelect component. Based on MUI Autocomplete, it accepts 4 properties:
 * values: the list of options that have to be shown
 * placeholder: the title at the top of the Component
 * setFilteredValues: the setter Method used to update the values
 * TODO: Rename more like "showId" - it's already too specific in the code
 * showDetailInfo: used to show extra infos (in brackets) after each option
 *
 * @constructor
 */
function IDComboSelect({values, placeholder, setFilteredValues, checkIfHasFeatures, showDetailInfo}: IDComboSelectProps) {
    const handleChange = (event: SyntheticEvent, value:Clients[]) => {
        // check if the selected element is a React Node element and if contains a value inside its props
        setFilteredValues(value);
    };

    return (
        // TODO: Shouldnt be List in outside wrapper? This is just the select-dropdown module?
        <List component="nav">
            {/* TODO: Do margin and padding in sidebar? Isn't there a default? */}
            <FormControl sx={{m: 1, width: "90%"}}>
                <Typography component="label">{placeholder}</Typography>
                {values.length > 0 && (
                    <Autocomplete
                        multiple
                        options={values}
                        onChange={handleChange}
                        data-testid="combobox"
                        disableCloseOnSelect={true}
                        // TODO: Add type definition for parameters
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        ListboxProps={{style: {maxHeight: "calc(100vh - 320px)"}}}
                        renderOption={(props, option, {selected}) => (
                            <li {...props} >
                                <Checkbox
                                    data-testid={option.id}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                    size="small"
                                />
                                {option.name + (showDetailInfo ? ` (${option.id})` : "")}
                            </li>
                        )}
                        getOptionDisabled={(option) =>
                            checkIfHasFeatures === true && !option.hasFeatures
                        }
                        renderInput={(params) => (
                            // TODO: Sprache auf deutsch ändern
                            // TODO: Placeholder läuft aus dem Feld raus/wird abgeschitten
                            //  --> sollte in die nächste Zeile rutschen
                            <TextField {...params} placeholder="Select a value" variant="standard" />
                        )}
                    />
                )}
            </FormControl>
        </List>
    );
}

export default IDComboSelect;
