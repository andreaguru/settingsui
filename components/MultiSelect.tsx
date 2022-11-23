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
import {SidebarProps} from "../types/componentProps.types";
import {ReactNode} from "react";

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

const getIdAndNameFromList = (client: ClientsInterface) => {
    const {id, name} = client;
    return JSON.stringify({id, name});
};

/**
 *
 * @constructor
 */
function MultiSelect({clients, filteredClients, dispatchFilteredClients}: SidebarProps) {
    const handleChange = (event: SelectChangeEvent<typeof filteredClients>, child:ReactNode) => {
        // check if the selectd element is a React Node element and if contains a value inside its props
        if (child !== null && typeof child == "object" && "props" in child) {
            const parsedClientValue = JSON.parse(child.props.value);
            dispatchFilteredClients({type: ReducerActionType.ADD_CLIENT, payload: parsedClientValue});
        }
    };

    const handleDelete = (customerToDelete: ClientsInterface) => () => {
        dispatchFilteredClients({type: ReducerActionType.DELETE_CLIENT, payload: customerToDelete});
    };

    return (
        <List component="nav">
            <FormControl sx={{m: 1, width: "80%"}}>
                <InputLabel id="demo-multiple-checkbox-label">ClientID / Name</InputLabel>
                {clients.length > 0 && (
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={filteredClients}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag"/>}
                        renderValue={() => false}
                        MenuProps={MenuProps}
                    >
                        {clients.map((client: ClientsInterface, index: number) => (
                            <MenuItem key={index} value={getIdAndNameFromList(client)}>
                                <Checkbox data-testid={`${client.id}`}
                                    checked={handleCheckbox(client.id, filteredClients)}/>
                                <ListItemText primary={`${client.name} (${client.id})`}/>
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>

            {filteredClients.map((client: ClientsInterface, key: number) => (
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
    getIdAndNameFromList,
};
/* end-test-block */
