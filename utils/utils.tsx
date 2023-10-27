import {EmotionJSX} from "@emotion/react/types/jsx-namespace";

// import typescript Interfaces
import {TableView} from "../types/componentProps.types";
import {Usage} from "../types/api.types";
import Chip from "@mui/material/Chip";

/**
 * getFeatureColorByStatus - return the right icon color according to client, category or tag status
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

    if (tableView === "CLIENT") {
        const activeClients = usages.filter((usage) => usage.id.clientId !== 0 && usage.active);
        const inactiveClients = usages.filter((usage) => usage.id.clientId !== 0 && !usage.active);
        return renderUsageStatus(activeClients.length, inactiveClients.length);
    } else if (tableView === "CATEGORY") {
        const activeCategories = usages.filter((usage) => usage.id.categoryId !== 0 && usage.active);
        const inactiveCategories = usages.filter((usage) => usage.id.categoryId !== 0 && !usage.active);
        return renderUsageStatus(activeCategories.length, inactiveCategories.length);
    } else if (tableView === "TAG") {
        const activeTags = usages.filter((usage) => usage.id.tagId !== 0 && usage.active);
        const inactiveTags = usages.filter((usage) => usage.id.tagId !== 0 && !usage.active);
        return renderUsageStatus(activeTags.length, inactiveTags.length);
    } else {
        // by default show aktiviert and deaktiviert with value 0
        return renderUsageStatus(0, 0);
    }
}
