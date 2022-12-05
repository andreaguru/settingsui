import FormControl from "@mui/material/FormControl";
import {Clients, ReducerActionType} from "../types/api.types";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import {MultiSelectProps} from "../types/componentProps.types";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

/**
 *
 * @constructor
 */
function ComboSelect({values, placeholder, filteredValues, dispatchFilteredValues, showDetailInfo}: MultiSelectProps) {
    const handleChange = (event: React.SyntheticEvent, value:Clients[]) => {
        // check if the selectd element is a React Node element and if contains a value inside its props
        if (value !== null && typeof value == "object") {
            dispatchFilteredValues({type: ReducerActionType.ADD_VALUE, payload: value});
        }
    };

    const handleDelete = (customerToDelete: Clients) => () => {
        dispatchFilteredValues({type: ReducerActionType.DELETE_VALUE, payload: customerToDelete});
    };

    return (
        <List component="nav">
            <FormControl sx={{m: 1, width: "80%"}}>
                {values.length > 0 && (
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={values}
                        disableCloseOnSelect
                        value={filteredValues}
                        onChange={handleChange}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        renderTags={(tagValue) => {
                            return tagValue.map((option, index) => (
                                <Typography variant="body2" key={index}>
                                    {option.name + (showDetailInfo ? ` (${option.id}), ` : "")}
                                </Typography>
                            ));
                        }}
                        renderOption={(props, option, {selected}) => (
                            <li {...props}>
                                <Checkbox
                                    data-testid={name}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {option.name + (showDetailInfo ? ` (${option.id})` : "")}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label={placeholder} placeholder={placeholder} />
                        )}
                    />
                )}
            </FormControl>

            {filteredValues.map((value: Clients, key: number) => (
                <div key={key}>
                    <Chip label={value.name + (showDetailInfo ? ` (${value.id})` : "")} onDelete={handleDelete(value)}/>
                </div>
            ))}
        </List>
    );
}

export default ComboSelect;
