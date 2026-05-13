import { JSX } from "react";

// import typescript Interfaces
import { TableView, Usage } from "types/api.types";
import Chip from "@mui/material/Chip";
import edid from "../themes/edid";
import logger from "../logger";
import { ExpandedConfigAction, ExpandedConfigMethod } from "types/context.types";
import { DialogAction, DialogFlow } from "types/componentProps.types";

/**
 * getIconColorByStatus - return the right icon color according to client, category or tag status
 * @param {string} status
 * @return {string}
 */
export function getIconColorByStatus(status: string) {
    switch (status) {
        case "ENABLED":
            return edid.palette.id_green.main; // #319E7D
        case "DISABLED":
            return edid.palette.id_red.main; // #F15653
        case "ENABLED_AND_DISABLED":
            return edid.palette.id_orange.main; // #FDAD0D
        case "NONE":
        default:
            return edid.palette.id_lightGray.main; // #A5A5A5
    }
}

/**
 * getUsageStatusColor
 * @param {Array<Usage>} usages
 * @return {string}
 */
export function getUsageStatusColor(usages: Usage[]) {
    const activeUsages = usages.filter(usage => usage.active);
    const inactiveUsages = usages.filter(usage => !usage.active);

    if (activeUsages.length && inactiveUsages.length) {
        return "id_orange";
    }
    if (activeUsages.length && !inactiveUsages.length) {
        return "id_green";
    }
    if (!activeUsages.length && inactiveUsages.length) {
        return "id_red";
    }
    // by default show aktiviert and deaktiviert with value 0
    return "id_lightGray";
}

/**
 * getSelectedUsages
 * @param {Array<Usage>} usages
 * @param {TableView} tableView
 * @return {Array<Usage>}
 */
export function getSelectedUsages(usages: Usage[], tableView: TableView) {
    if (tableView === TableView.CLIENT) {
        /* According to https://ippen.atlassian.net/browse/CORE-2595, Tag Usages are now set with both tagID and clientId.
        This means that if a usage has both IDs, it is set at Tag level, but not at client level.
        That's why here we filter out the usages with tagId 0. */
        return usages.filter(usage => usage.id.clientId !== 0 && usage.id.tagId === 0);
    }
    if (tableView === TableView.CATEGORY) {
        return usages.filter(usage => usage.id.categoryId !== 0);
    }
    if (tableView === TableView.TAG) {
        return usages.filter(usage => usage.id.tagId !== 0);
    }
    return usages;
}

/**
 * showUsageLabel
 * show the labels with the current status of the usages for a
 * specific configuration (how many active and not active usages are present). See Layout:
 * https://xd.adobe.com/view/e54d650f-8015-409d-bb4f-ee719174d24f-b01e/screen/539745da-91b3-4099-b696-7a3efb4c0ebe/
 * @param {Array<Usage>} usages
 * @return {JSX.Element[]}
 */
export function showUsageLabel(usages: Usage[]) {
    /**
     * renderUsageStatus
     * In this function we render the two components (active and inactive)
     * with the infos that they have to show
     * We use an extra function in order to not repeat the code
     * @param {number} activeLength
     * @param {number} inactiveLength
     * @return {JSX.Element[]}
     */
    function renderUsageStatus(activeLength: number, inactiveLength: number): JSX.Element[] {
        return [
            <Chip
                key="1"
                label={`aktiviert ${activeLength}`}
                disabled={activeLength === 0}
                size="small"
                sx={{
                    color: "id_green.main",
                    bgcolor: "id_green.light",
                }}
            />,
            <Chip
                key="2"
                label={`deaktiviert ${inactiveLength}`}
                disabled={inactiveLength === 0}
                size="small"
                sx={{
                    color: "id_red.main",
                    bgcolor: "id_red.light",
                }}
            />,
        ];
    }

    const activeUsages = usages.filter(usage => usage.active);
    const inactiveUsages = usages.filter(usage => !usage.active);
    return renderUsageStatus(activeUsages.length, inactiveUsages.length);
}

/**
 * Convert a given string value to a formatted date and time string
 * based on the specified language and format options.
 *
 * @param {string} value - The string value representing a date.
 * @param {string} lang - The language code for localizing the date string.
 * @param {Intl.DateTimeFormatOptions} dateFormat - The format options for formatting the date string.
 *
 * @return {string} - The formatted date and time string.
 */
export function dateTimeFormatter(
    value: string,
    lang: string,
    dateFormat: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    },
) {
    return new Date(value).toLocaleDateString(lang, dateFormat);
}

// Basic fetcher used for SWR
export async function fetcher<T>(url: string): Promise<T> {
    return fetch(url, { credentials: "include" })
        .then(res => res.json() as Promise<T>)
        .catch(error => {
            logger.info(error, "Fetch error");
            return [] as unknown as T;
        });
}

export const authFetcher = async(url: string) => fetch(url, { credentials: "include" })
    .then(res => {
        return { res, data: res.json() };
    })
    .catch((error: Error) => {
        // Instead of throwing an error, return the status code with no data
        return { res: error, data: null };
    });

/**
 * Reduces the current state based on the given action for managing an expanded configuration list.
 *
 * @param {Array<number>} state - The current state of the expanded configuration list.
 * @param {ExpandedConfigAction} action - The action to be applied to the state.
 *
 * @return {Array<number>} The new state of the expanded configuration list after applying the action.
 */
export function expandedConfigReducer(state: number[], action: ExpandedConfigAction): number[] {
    switch (action.type) {
        case ExpandedConfigMethod.ADD: {
            return [...state, action.payload];
        }
        case ExpandedConfigMethod.REMOVE: {
            return state.filter((item: number) => item !== action.payload);
        }
        default:
            return state;
    }
}

// The reducer to manage the dialog state with the user, according to user actions
export function dialogHandler(state: DialogFlow, action: DialogAction): DialogFlow {
    switch (action.type) {
        case "DELETE_CONFIG":
            return { ...state,
                openConfirmModal: true,
                action: "delete",
                button: "Löschen",
                description: "Möchten Sie die Konfiguration wirklich löschen?" };
        case "EDIT_CONFIG":
            return { ...state,
                openConfirmModal: true,
                action: "edit",
                button: "Veröffentlichen",
                description: "Möchten Sie Ihre Änderungen veröffentlichen?" };
        case "RESET_CONFIG":
            return { ...state,
                openConfirmModal: true,
                viewMode: action.payload,
                action: "reset",
                button: action.payload ? "Verwerfen" : "Zurücksetzen",
                description: action.payload ?
                    "Sie haben Änderungen am Dokument vorgenommen." +
                    "Möchten Sie diese wirklich verwerfen?" :
                    "Möchten Sie Ihre Änderungen wirklich zurücksetzen?" };
        case "CLEAN_FLOW":
            return { ...state,
                openConfirmModal: false,
                action: undefined };
        case "SERVER_ERROR":
            return { ...state,
                openConfirmModal: true,
                action: "error",
                button: "Okay",
                description: "Es gab ein Problem bei der Aktualisierung Ihrer Daten." +
                    "Bitte versuchen Sie es später noch einmal." };
        default:
            return state;
    }
}
