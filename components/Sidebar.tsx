import {useEffect, useState} from "react";

// import MUI Components
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import styled from "@mui/material/styles/styled";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import custom Components
import {getFeaturesList} from "../api/DashboardAPI";
import IDComboSelect from "./IDComboSelect";
import IDRadioGroup from "./IDRadioGroup";

// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";

/*
We customise the MUI Component MuiDrawer in order to apply custom styles/effects to the sidebar.
Components customisation is performed via styled utility (https://mui.com/system/styled/)
*/
// TODO: Move to theme
const Drawer = styled(MuiDrawer)(() => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: 300,
        boxSizing: "border-box",
    },
}));

/**
 * Sidebar component. The two properties clients and setFilteredClients are just passed to IDComboSelect.
 * in useEffect we retrieve the complete Featurelist and assign it to the status features
 *
 * @constructor
 */
function Sidebar(
    {clients,
        setFilteredClients,
        setFilteredFeatures,
        handleFeatureStatusChange}: SidebarProps
) {
    // get the complete list of Features
    const [features, setFeatures] = useState([]);

    // TODO: Add comment about "useEffect"
    // TODO: What is this doing here? Why just features? Move it?
    useEffect(() => {
        const data = getFeaturesList();
        data.then((data) => {
            if (data) {
                // TODO: Where is this declared? --> small description
                setFeatures(data);
            }
        })
            .catch((error) => {
                // TODO: Add logger
                console.log(error);
            });
    }, []);

    return (
        <Drawer variant="permanent">
            {/* TODO: Move styles somewhere else and style whole sidebar?*/}
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    px: [1],
                }}
            >
                <FilterAltSharpIcon fontSize="medium" /> <Typography marginLeft={1} variant="h6">Filter</Typography>
            </Toolbar>
            <IDComboSelect values={clients}
                placeholder="Mandant"
                setFilteredValues={setFilteredClients}
                checkIfHasFeatures={true}
                showDetailInfo={true}/>

            <IDComboSelect values={features}
                placeholder="Feature"
                setFilteredValues={setFilteredFeatures}
                showDetailInfo={false}/>

            <IDRadioGroup handleFeatureStatusChange={handleFeatureStatusChange} />
        </Drawer>
    );
}

export default Sidebar;
