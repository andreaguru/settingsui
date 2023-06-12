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
import {useTheme} from "@mui/material/styles";
import {alpha} from "@mui/material";

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
    const theme = useTheme();

    return (
        <FormControl>
            {values.length == 0 && (
                <Skeleton variant="rounded" height={56} />
            )}
            {values.length > 0 && (
                <>
                    <Typography component="label">{title}</Typography>
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
                        getOptionLabel={
                            (option: ClientOrFeature) => "label" in option ?
                                option.label :
                                `${option.name} | ${option.id}`
                        }
                        ListboxProps={{style: {maxHeight: "calc(100vh - 320px)"}}}
                        renderOption={(props, option: ClientOrFeature, {selected}) => (
                            <li {...props}>
                                <Checkbox
                                    data-testid={option.id}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                    size="small"/>
                                <Typography variant="subtitle1"
                                    color={theme.palette.neutral.main}
                                    sx={{display: "flex", alignItems: "center", gap: theme.spacing(1)}}>

                                    {"label" in option &&
                                         <Typography
                                             variant="subtitle2"
                                             color={theme.palette.secondary.main}
                                             fontWeight="700">
                                             {option.label}
                                         </Typography>
                                    }
                                    {!("label" in option) &&
                                         <Typography
                                             variant="subtitle2"
                                             color={theme.palette.secondary.main}
                                             fontWeight="700">
                                             {option.name}
                                             <Typography
                                                 variant="inherit"
                                                 component="span"
                                                 fontWeight="normal"
                                                 color={alpha(theme.palette.secondary.main, 0.6)}
                                             >
                                                 {showId ? ` | ${option.id}` : ""}
                                             </Typography>
                                         </Typography>
                                    }
                                </Typography>
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
