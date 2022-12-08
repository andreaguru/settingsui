import {useEffect, useState} from "react";

// import MUI Components
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import styled from "@mui/material/styles/styled";
import MuiDrawer from "@mui/material/Drawer";
import {getFeaturesList} from "../api/DashboardAPI";

// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";
import IDComboSelect from "./IDComboSelect";
import IDRadioGroup from "./IDRadioGroup";

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
 * @constructor
 */
function Sidebar(
    {clients,
        filteredClients,
        setFilteredClients,
        filteredFeatures,
        setFilteredFeatures,
        handleFeatureStatusChange}: SidebarProps
) {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // get the complete list of Features
    const [features, setFeatures] = useState([]);

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

            <IDComboSelect values={clients}
                placeholder="ClientID / Name"
                filteredValues={filteredClients}
                setFilteredValues={setFilteredClients}
                showDetailInfo={true}/>

            <IDComboSelect values={features}
                placeholder="Features"
                filteredValues={filteredFeatures}
                setFilteredValues={setFilteredFeatures}
                showDetailInfo={true}/>

            <IDRadioGroup handleFeatureStatusChange={handleFeatureStatusChange} />

        </Drawer>
    );
}

export default Sidebar;
