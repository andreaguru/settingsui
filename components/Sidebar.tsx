import {useEffect, useState} from "react";
const logger = require("pino")();

// import MUI Components
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import custom Components
import {getFeaturesList} from "../api/DashboardAPI";
import IDComboSelect from "./IDComboSelect";
import IDRadioGroup from "./IDRadioGroup";

// import Interfaces to check data type in Typescript
import {SidebarProps} from "../types/componentProps.types";
import {FeatureList} from "../types/api.types";

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
    const [features, setFeatures] = useState<FeatureList[]>([]);

    // TODO: Add comment about "useEffect"
    // TODO: What is this doing here? Why just features? Move it?
    /* ANSWER: The code inside this useEffect is called only once, the first time that the Sidebar component is loaded.
    This is the moment when we want to get the feature list from APIs and set the features status with its value.
    We set the state in this component instead of in index.tsx because we need it only here.
     We could declare it in index.tsx, but then we need to pass it as prop to Sidebar.tsx, where it is needed. */
    useEffect(() => {
        const data = getFeaturesList();
        data.then((data) => {
            if (data && data.length) {
                setFeatures(data);
            }
        })
            .catch((error) => {
                logger.error(error);
            });
    }, []);

    return (
        <MuiDrawer variant="permanent">
            <Toolbar className="filterIcon">
                <FilterAltSharpIcon fontSize="medium" /> <Typography marginLeft={1} variant="h6">Filter</Typography>
            </Toolbar>
            <IDComboSelect values={clients}
                title="Mandant"
                placeholder="Name / clientId"
                setFilteredValues={setFilteredClients}
                checkIfHasFeatures={true}
                showId={true}/>

            <IDComboSelect values={features}
                title="Feature"
                placeholder="z.B. AdDefend, CleverPush Anmelde-Widget"
                setFilteredValues={setFilteredFeatures}
                showId={false}/>

            <IDRadioGroup handleFeatureStatusChange={handleFeatureStatusChange} />
        </MuiDrawer>
    );
}

export default Sidebar;
