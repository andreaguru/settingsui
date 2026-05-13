import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { SyntheticEvent } from "react";

// import typescript Interfaces
import { IDComboSelectProps } from "types/componentProps.types";
import { styled, useTheme } from "@mui/material/styles";
import { Client, Feature } from "types/api.types";

const ComboSelectLabel = styled(Typography)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    ...theme.typography.subtitle2,
    color: theme.palette.secondary.main,
}));

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
function IDComboSelect<T extends Client | Feature>({
    filteredValues,
    placeholder,
    setFilteredValues,
    showId,
    title,
    values,
}: IDComboSelectProps<T>) {
    const handleChange = (event: SyntheticEvent, value: T[]) => {
        setFilteredValues(value);
    };
    const theme = useTheme();

    return (
        <FormControl>
            {values.length === 0 && <Skeleton variant="rounded" height={56} />}
            {values.length > 0 && (
                <>
                    <Typography component="label" htmlFor={title}>
                        {title}
                    </Typography>
                    <Autocomplete
                        id={title}
                        multiple
                        options={values}
                        value={filteredValues}
                        onChange={handleChange}
                        data-testid="combobox"
                        disableCloseOnSelect
                        noOptionsText="Kein Ergebnis"
                        isOptionEqualToValue={
                            (option, value) => option.name === value.name
                        }
                        getOptionLabel={
                            option => "key" in option ?
                                option.name :
                                `${option.name} | ${option.id}`
                        }
                        slotProps={{
                            listbox: { sx: { maxHeight: "calc(100vh - 320px)" } },
                        }}
                        renderOption={(props, option, { selected }) => {
                            const { key, ...rest } = props;
                            return (
                                <li key={key} {...rest} style={{ paddingLeft: theme.spacing(0.5) }}>
                                    <Checkbox
                                        id={`id-${option.id}`}
                                        data-testid={option.id}
                                        checked={selected}
                                        size="small"
                                    />
                                    <ComboSelectLabel>
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                            sx={{
                                                color: "secondary.main",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {option.name}
                                        </Typography>
                                        {!("key" in option) && (
                                            <Typography
                                                variant="inherit"
                                                component="span"
                                                sx={{
                                                    fontWeight: "normal",
                                                    color: "secondary.light",
                                                }}
                                            >
                                                {showId ? ` | ${option.id}` : ""}
                                            </Typography>
                                        )}
                                    </ComboSelectLabel>
                                </li>
                            );
                        }}
                        renderInput={params => (
                            <TextField {...params} placeholder={placeholder} variant="standard" />
                        )}
                    />
                </>
            )}
        </FormControl>
    );
}

export default IDComboSelect;
