import useSWR, { useSWRConfig } from "swr";
import { Client, Feature } from "types/api.types";
import { fetcher } from "utils/utils";
import logger from "../logger";
import BlackListClients from "./BlackListClients";

// get the endpoints from the environment variables
const cmsEndpoint = process.env.NEXT_PUBLIC_CMS_API_CLIENTS ?? "";
const featureListEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES ?? "";
const settingsApiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_OVERVIEW_BASE ?? "";

/**
 * Get the complete list of the clients.
 * @return {Promise<Array<Client>>}
 * @constructor
 */
export function useClientList(): Client[] {
    const { data, error, isLoading } = useSWR<Client[], Error>(cmsEndpoint, fetcher);
    // return two arrays with the data from the two fetch requests

    if (isLoading) {
        return [];
    }

    if (error) {
        logger.error(error, "Could not get Clients");
    }

    // filter the result in order to show only clients that have a name and that are not in the black list
    const clientArray: Client[] =
        data?.filter((client: Client) => client.name && !BlackListClients.includes(client.id)) ?? [];

    return clientArray.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get Feature List for a specific client.
 * @constructor
 */
export function useFeaturesPerClient(clientId: number, clientIdInView: number | undefined): Feature[] {
    const { cache } = useSWRConfig();
    const isCached = cache.get(`${settingsApiEndpoint}/${clientId}`);
    const { data, error, isLoading } =
        useSWR<Feature[], Error>(`${settingsApiEndpoint}/${clientId}`, fetcher, {
            /* We re-fetch the features in case there are not data cached
            in case of navigation from detail page back to home,
            we also re-fetch them but only for the client that has been selected.
            For the other client, the features are taken from SWR cache. */
            revalidateOnFocus: false,
            revalidateOnMount: isCached === undefined || clientIdInView === clientId,
        });
    if (error) {
        logger.error(error, `Could not get Features for client ${clientId}`);
        return [];
    }
    if (isLoading) {
        return [];
    }
    return data ?? [];
}

/**
 * Get complete Feature List.
 * @return {Array<Client>}
 * @constructor
 */
export function useFeaturesList(): Feature[] {
    const { data, error, isLoading } = useSWR<Feature[], Error>(featureListEndpoint, fetcher);
    // return two arrays with the data from the two fetch requests

    if (isLoading) {
        return [];
    }

    if (error) {
        logger.error(error, "Could not get Features list");
        return [];
    }
    return data ?? [];
}
