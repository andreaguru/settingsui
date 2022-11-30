import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import {ClientsInterface, ReducerActionType} from "../types/api.types";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import {MultiSelectProps} from "../types/componentProps.types";

// Properties of the menu items in the Select component
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 350,
        },
    },
};

const handleCheckbox = (clientId: number, filteredClientsList:ClientsInterface[]) => {
    return filteredClientsList.some((filteredClient: ClientsInterface) => filteredClient.id === clientId);
};

/**
 *
 * @constructor
 */
function MultiSelect({values, filteredValues, dispatchFilteredValues, showId}: MultiSelectProps) {
    const handleChange = (event: SelectChangeEvent<typeof filteredValues>) => {
        const value = event.target.value;
        // check if the selectd element is a React Node element and if contains a value inside its props
        if (value !== null && typeof value == "object") {
            // const parsedClientValue = JSON.parse(child.props.value);
            dispatchFilteredValues({type: ReducerActionType.ADD_VALUE, payload: value});
        }
    };

    const handleDelete = (customerToDelete: ClientsInterface) => () => {
        dispatchFilteredValues({type: ReducerActionType.DELETE_VALUE, payload: customerToDelete});
    };

    return (
        <List component="nav">
            <FormControl sx={{m: 1, width: "80%"}}>
                <InputLabel id="demo-multiple-checkbox-label">ClientID / Name</InputLabel>
                {values.length > 0 && (
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={filteredValues}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag"/>}
                        renderValue={() => false}
                        MenuProps={MenuProps}
                    >
                        {values.map((value: ClientsInterface, index: number) => (
                            /* MenuItem Component does not accept an object as value type.
                            The problem is still open, there is no official solution yet in MUI.
                            The example hier: https://mui.com/material-ui/react-select/#multiple-select
                            shows a case where the value is an array of strings, which is allowed in Typescript.
                            In our case we have an array ob objects (client id and name), which is not allowed.
                            The type comes from interface LiHTMLAttributes in node_modules/@types/react/index.d.ts
                            There are a few workarounds for that, the most popular is currently ts-ignore:
                            https://github.com/mui/material-ui/issues/14286 */
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            <MenuItem key={index} value={value}>
                                <Checkbox data-testid={`${value.id}`}
                                    checked={handleCheckbox(value.id, filteredValues)}/>
                                <ListItemText primary={value.name + (showId ? ` (${value.id})` : "")}/>
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>

            {filteredValues.map((client: ClientsInterface, key: number) => (
                <div key={key}>
                    <Chip label={`${client.name} (${client.id})`} onDelete={handleDelete(client)}/>
                </div>
            ))}
        </List>
    );
}

export default MultiSelect;

/* start-test-block */
export {
    handleCheckbox,
};
/* end-test-block */
