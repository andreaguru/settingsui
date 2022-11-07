import {useState} from "react"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
import Chip from "@mui/material/Chip"
import {secondaryListItems} from "./ListItems"
import {styled} from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import {useContext} from "react"
import {ClientsContext, FilteredClientsContext, FilteredClientsDispatchContext} from "../context/AppContext"
import {ReducerActionType} from "../types/interfaces";

const appBarHeight: number = 64
const drawerWidth: number = 240

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
        marginTop: appBarHeight,
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
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function Sidebar() {
    const [open, setOpen] = useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const clientsList = useContext(ClientsContext)
    const filteredClientsList = useContext(FilteredClientsContext)
    const dispatchFilteredClientsList = useContext(FilteredClientsDispatchContext)

    const handleChange = (event: SelectChangeEvent<typeof filteredClientsList>) => {
        const {
            target: {value},
        } = event

        if (typeof value === "object" && filteredClientsList) {
            dispatchFilteredClientsList({type: ReducerActionType.ADD_CLIENT, payload: value})
        }
    }

    const handleDelete = (chipToDelete: number) => () => {
        dispatchFilteredClientsList({type: ReducerActionType.DELETE_CLIENT, payload: chipToDelete})
    }

    const handleCheckbox = (clientId: number) => {
        return filteredClientsList.some((filteredClient: any) => filteredClient.id === clientId)
    }

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
            <Divider/>
            <List component="nav">
                <FormControl sx={{m: 1, width: 300}}>
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
                                return false
                            }}
                            MenuProps={MenuProps}
                        >
                            {clientsList.map((client: any, index: number) => (
                                <MenuItem key={index} value={client}>
                                    <Checkbox checked={handleCheckbox(client.id)}/>
                                    <ListItemText primary={client.id}/>
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>

                {filteredClientsList.map((client: any, key: any) => (
                    <div key={key}>
                        <Chip label={client.id} onDelete={handleDelete(client.id)}/>
                    </div>
                ))}

                <Divider sx={{my: 1}}/>
                {secondaryListItems}
            </List>
        </Drawer>
    )
}

export default Sidebar
