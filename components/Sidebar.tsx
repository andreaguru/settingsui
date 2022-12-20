// import MUI Components
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import styled from "@mui/material/styles/styled";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import custom Components
import IDComboSelect from "./IDComboSelect";

// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";

/*
We customise the MUI Component MuiDrawer in order to apply custom styles/effects to the sidebar.
Components customisation is performed via styled utility (https://mui.com/system/styled/)
*/
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
 *
 * @constructor
 */
function Sidebar(
    {clients, setFilteredClients}: SidebarProps
) {
    return (
        <Drawer variant="permanent">
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
                showDetailInfo={true}/>
        </Drawer>
    );
}

export default Sidebar;
