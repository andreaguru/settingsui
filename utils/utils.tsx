import {EmotionJSX} from "@emotion/react/types/jsx-namespace";

// import typescript Interfaces
import {TableView} from "../types/componentProps.types";
import {Usage} from "../types/api.types";
import Chip from "@mui/material/Chip";

interface ActiveInactiveProps {
    activeUsages: Usage[];
    inactiveUsages: Usage[];
}

/**
 * getActiveAndInactiveUsage
 * get active ad inactive usages according to the Tab that has been selected (CLIENT, CATEGORY or TAG)
 * @param {TableView} tableView
 * @param {Array<Usage>} usages
 * @return {ActiveInactiveProps}
 */
function getActiveAndInactiveUsage(tableView: TableView, usages: Array<Usage>): ActiveInactiveProps {
    let activeUsages;
    let inactiveUsages;
    if (tableView === "CLIENT") {
        activeUsages = usages.filter((usage) => usage.id.clientId !== 0 && usage.active);
        inactiveUsages = usages.filter((usage) => usage.id.clientId !== 0 && !usage.active);
    } else if (tableView === "CATEGORY") {
        activeUsages = usages.filter((usage) => usage.id.categoryId !== 0 && usage.active);
        inactiveUsages = usages.filter((usage) => usage.id.categoryId !== 0 && !usage.active);
    } else if (tableView === "TAG") {
        activeUsages = usages.filter((usage) => usage.id.tagId !== 0 && usage.active);
        inactiveUsages = usages.filter((usage) => usage.id.tagId !== 0 && !usage.active);
    }
    return {activeUsages, inactiveUsages} as ActiveInactiveProps;
}

/**
 * getIconColorByStatus - return the right icon color according to client, category or tag status
 * @param {string} status
 * @return {string}
 */
export function getIconColorByStatus(status: string) {
    switch (status) {
    case "ENABLED":
        return "id_green"; // #319E7D
    case "DISABLED":
        return "id_red"; // #F15653
    case "ENABLED_AND_DISABLED":
        return "id_orange"; // #FDAD0D
    case "NONE":
    default:
        return "id_lightGray"; // #A5A5A5
    }
}

/**
 * getUsageStatusColor
 * @param {TableView} tableView
 * @param {Array<Usage>} usages
 * @return {string}
 */
export function getUsageStatusColor(tableView: TableView, usages: Array<Usage>) {
    const {activeUsages, inactiveUsages} = getActiveAndInactiveUsage(tableView, usages);

    if (activeUsages.length && inactiveUsages.length) {
        return "id_orange";
    } else if (activeUsages.length && !inactiveUsages.length) {
        return "id_green";
    } else if (!activeUsages.length && inactiveUsages.length) {
        return "id_red";
    }
    // by default show aktiviert and deaktiviert with value 0
    return "id_lightGray";
}

/**
 * showUsageLabel
 * show the labels with the current status of the usages for a
 * specific configuration (how many active and not active usages are present). See Layout:
 * https://xd.adobe.com/view/e54d650f-8015-409d-bb4f-ee719174d24f-b01e/screen/539745da-91b3-4099-b696-7a3efb4c0ebe/
 * @param {Array<Usage>} usages
 * @param {TableView} tableView
 * @return {EmotionJSX.Element[]}
 */
export function showUsageLabel(usages: Array<Usage>, tableView: TableView) {
    /**
     * renderUsageStatus
     * In this function we render the two components (active and inactive) wit the infos that they have to show
     * We use an extra function in order to not repeat the code
     * @param {number} activeLength
     * @param {number} inactiveLength
     * @return {EmotionJSX.Element[]}
     */
    function renderUsageStatus(activeLength: number, inactiveLength: number): EmotionJSX.Element[] {
        return [
            <Chip
                key="1"
                label={`aktiviert ${activeLength}`}
                disabled={activeLength === 0}
                size="small"
                sx={{
                    color: "id_green.main",
                    bgcolor: "id_green.light",
                }} />,
            <Chip
                key="2"
                label={`deaktiviert ${inactiveLength}`}
                disabled={inactiveLength === 0}
                size="small"
                sx={{
                    color: "id_red.main",
                    bgcolor: "id_red.light",
                }}/>,
        ];
    }

    const {activeUsages, inactiveUsages} = getActiveAndInactiveUsage(tableView, usages);
    return renderUsageStatus(activeUsages.length, inactiveUsages.length);
}
