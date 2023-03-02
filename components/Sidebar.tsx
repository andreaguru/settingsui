// import MUI Components
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import custom Components
import IDComboSelect from "./IDComboSelect";
/* import IDRadioGroup from "./IDRadioGroup"; */
// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";
import {Client} from "../types/api.types";

/**
 * Sidebar component. The two properties clients and setFilteredClients are just passed to IDComboSelect.
 * @constructor
 */
function Sidebar(
    {
        clients,
        filteredClients,
        filteredFeatures,
        setFilteredClients,
        setFilteredFeatures,
        setFeatureStatus}: SidebarProps
) {
    /**
     * getFeaturesList
     * @param {Array<Client>} clients
     * @return {Array<Feature>}
     */
    function getFeaturesList(clients:Array<Client>) {
        return clients.length > 0 ? clients[0].features : [];
    }

    return (
        <MuiDrawer variant="permanent">
            <Toolbar className="toolbarTitle" disableGutters={true}>
                <FilterAltSharpIcon fontSize="inherit" /> <Typography marginLeft={1} variant="h6">Filter</Typography>
            </Toolbar>
            <IDComboSelect values={clients}
                title="Mandant"
                placeholder="Name / clientId"
                filteredValues={filteredClients}
                setFilteredValues={setFilteredClients}
                showId={true}/>

            <IDComboSelect values={getFeaturesList(clients)}
                title="Feature"
                placeholder="z.B. AdDefend, CleverPush Anmelde-Widget"
                filteredValues={filteredFeatures}
                setFilteredValues={setFilteredFeatures}
                showId={false}/>

            {/* <IDRadioGroup setFeatureStatus={setFeatureStatus} /> */}
        </MuiDrawer>
    );
}

export default Sidebar;
