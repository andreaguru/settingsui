// import MUI Components
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

// import custom Components
import IDComboSelect from "./IDComboSelect";
import IDRadioGroup from "./IDRadioGroup";

// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";

/**
 * Sidebar component. The two properties clients and setFilteredClients are just passed to IDComboSelect.
 * @constructor
 */
function Sidebar(
    {
        clients,
        features,
        filteredClients,
        filteredFeatures,
        setFilteredClients,
        setFilteredFeatures,
        handleFeatureStatusChange}: SidebarProps
) {
    return (
        <MuiDrawer variant="permanent">
            <Toolbar className="filterIcon">
                <NextLink href={`/test`} passHref>okok</NextLink>
                <FilterAltSharpIcon fontSize="medium" /> <Typography marginLeft={1} variant="h6">Filter</Typography>
            </Toolbar>
            <IDComboSelect values={clients}
                title="Mandant"
                placeholder="Name / clientId"
                filteredValues={filteredClients}
                setFilteredValues={setFilteredClients}
                showId={true}/>

            <IDComboSelect values={features}
                title="Feature"
                placeholder="z.B. AdDefend, CleverPush Anmelde-Widget"
                filteredValues={filteredFeatures}
                setFilteredValues={setFilteredFeatures}
                showId={false}/>

            <IDRadioGroup handleFeatureStatusChange={handleFeatureStatusChange} />
        </MuiDrawer>
    );
}

export default Sidebar;
