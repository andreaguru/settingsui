import {Dispatch, useState} from "react";

// import MUI Components
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import styled from "@mui/material/styles/styled";
import MuiDrawer from "@mui/material/Drawer";

// import Interfaces to check data type in Typescript
import {ClientsInterface, ReducerAction, ReducerActionType} from "../types/query.types";

interface SidebarProps {
   clientsList: ClientsInterface[];
   filteredClientsList: ClientsInterface[];
   dispatchFilteredClientsList: Dispatch<ReducerAction>;
}

const appBarHeight = 64;
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        paddingTop: appBarHeight,
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 *
 * @constructor
 */
function Sidebar({clientsList, filteredClientsList, dispatchFilteredClientsList}: SidebarProps) {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChange = (event: SelectChangeEvent<typeof filteredClientsList>) => {
        const value = event.target.value;

        if (typeof value === "object" && filteredClientsList) {
            dispatchFilteredClientsList({type: ReducerActionType.ADD_CLIENT, payload: value});
        }
    };

    const handleDelete = (customerToDelete: number) => () => {
        dispatchFilteredClientsList({type: ReducerActionType.DELETE_CLIENT, payload: customerToDelete});
    };

    const handleCheckbox = (clientId: number) => {
        return filteredClientsList.some((filteredClient: ClientsInterface) => filteredClient.id === clientId);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>{open ? <ChevronLeft/> : <ChevronRight/>}</IconButton>
            </Toolbar>

            <List component="nav">
                <FormControl sx={{m: 1, width: "80%"}}>
                    <InputLabel id="demo-multiple-checkbox-label">ClientID / Name</InputLabel>
                    {clientsList.length > 0 && (
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={filteredClientsList}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag"/>}
                            renderValue={() => {
                                return false;
                            }}
                            MenuProps={MenuProps}
                        >
                            {clientsList.map((client:ClientsInterface, index: number) => (
                            /* the value prop of MenuItem component does not accept an object as value,
                            since it inherites the type from LiHTMLAttributes.
                            According to the users, the best solution would be to set client type as any,
                            or disable typescript for this line.
                            In our case I suggest to use the second option, so that we do not get a warning.
                            https://github.com/mui/material-ui/issues/14286 */
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                <MenuItem key={index} value={client}>
                                    <Checkbox checked={handleCheckbox(client.id)}/>
                                    <ListItemText primary={client.name}/>
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>

                {filteredClientsList.map((client: ClientsInterface, key: number) => (
                    <div key={key}>
                        <Chip label={client.name} onDelete={handleDelete(client.id)}/>
                    </div>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
