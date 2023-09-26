/**
 * getFeatureColorByStatus - return the right icon color according to category and tag status
 * @param {string} status
 * @return {string}
 */
export function getIconColorByStatus(status:string) {
    switch (status) {
    case "ENABLED":
        return "success"; // #319E7D
    case "DISABLED":
        return "error"; // #F15653
    case "ENABLED_AND_DISABLED":
        return "warning"; // #FDAD0D
    case "NONE":
    default: return "disabled"; // #A5A5A5
    }
}
