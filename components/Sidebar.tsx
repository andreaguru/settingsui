import {useEffect, useReducer, useState} from "react";

// import MUI Components
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import styled from "@mui/material/styles/styled";
import MuiDrawer from "@mui/material/Drawer";
import MultiSelect from "./MultiSelect";

// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";
import {getFeaturesList} from "../api/DashboardAPI";
import {ClientsInterface, ReducerActions, ReducerActionType} from "../types/api.types";

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: 300,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
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

/**
 *
 * @param {ClientsInterface[]} filteredClients
 * @param {ReducerActions} action
 * @return {boolean} true
 */
function filteredFeaturesReducer(filteredClients: ClientsInterface[], action: ReducerActions): ClientsInterface[] {
    switch (action.type) {
    case ReducerActionType.ADD_VALUE:
        return action.payload;
    case ReducerActionType.DELETE_VALUE:
        return filteredClients.filter((client: ClientsInterface) => client.id !== action.payload.id);
    default:
        throw new Error();
    }
}

/**
 *
 * @constructor
 */
function Sidebar({clients, filteredClients, dispatchFilteredClients}: SidebarProps) {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [features, setFeatures] = useState([]);
    const [filteredFeatures, dispatchFilteredFeatures] = useReducer(filteredFeaturesReducer, []);

    useEffect(() => {
        const data = getFeaturesList();
        data.then((data) => {
            if (data) {
                setFeatures(data);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
            <MultiSelect values={clients}
                filteredValues={filteredClients}
                dispatchFilteredValues={dispatchFilteredClients}
                showId={true}/>

            <MultiSelect values={features}
                filteredValues={filteredFeatures}
                dispatchFilteredValues={dispatchFilteredFeatures} />
        </Drawer>
    );
}

export default Sidebar;


