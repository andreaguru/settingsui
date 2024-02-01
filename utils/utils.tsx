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

