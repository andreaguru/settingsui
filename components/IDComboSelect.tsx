import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import {SyntheticEvent} from "react";

// import typescript Interfaces
import {ClientOrFeature} from "../types/api.types";
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
function IDComboSelect({
    values,
    title,
    placeholder,
    setFilteredValues,
    showId}: IDComboSelectProps) {
    const handleChange = (event: SyntheticEvent, value:Array<ClientOrFeature>) => {
        setFilteredValues(value);
    };

    return (
        <FormControl>
            {values.length == 0 && (
                <Skeleton variant="rounded" height={56} />
            )}
            {values.length > 0 && (
                <>
                    <Typography component="label">{title}</Typography><Autocomplete
                        multiple
                        options={values}
                        onChange={handleChange}
                        data-testid="combobox"
                        disableCloseOnSelect={true}
                        isOptionEqualToValue={
                            (option: ClientOrFeature, value: ClientOrFeature) => option.name === value.name
                        }
                        getOptionLabel={
                            (option: ClientOrFeature) => "label" in option ?
                                option.label :
                                `${option.name} (${option.id})`
                        }
                        ListboxProps={{style: {maxHeight: "calc(100vh - 320px)"}}}
                        renderOption={(props, option: ClientOrFeature, {selected}) => (
                            <li {...props}>
                                <Checkbox
                                    data-testid={option.id}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                    size="small"/>
                                {"label" in option ? option.label : option.name + (showId ? ` (${option.id})` : "")}
                            </li>
                        )}
                        getOptionDisabled={(option) => "hasFeatures" in option ? !option.hasFeatures : false}
                        renderInput={(params) => (
                            <TextField {...params} placeholder={placeholder} variant="standard"/>
                        )}/>
                </>
            )}
        </FormControl>
    );
}

export default IDComboSelect;
