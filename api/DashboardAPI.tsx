import {logger} from "../logger";
import {Client, Feature} from "../types/api.types";
import {BlackListClients} from "./BlackListClients";

// get the endpoints from the environment variables
const cmsEndpoint = process.env.NEXT_PUBLIC_CMS_API_CLIENTS || "";
const settingsApiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_OVERVIEW_BASE || "";

/**
 * Get the complete list of the clients.
 * @return {Promise<Array<Client>>}
 * @constructor
 */
export async function getClientList():Promise<Array<Client> | void> {
    try {
        const response = await fetch(cmsEndpoint);

        // return two arrays with the data from the two fetch requests
        const clientsPromise:Array<Client> = await response.json();

        // filter the result in order to show only clients that have a name and that are not in the black list
        if (clientsPromise.length) {
            const clientArray = clientsPromise.filter((client: Client) => {
                return client.name && !BlackListClients.includes(client.name);
            }) as Array<Client>;
            clientArray.sort((clientPrev, clientNext) => clientPrev.name.localeCompare(clientNext.name));
            return clientArray;
        }
    } catch (error) {
        logger.error(error);
    }
}

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} clientId
 * @constructor
 */
export async function getFeaturesPerClient(clientId:number):Promise<Array<Feature> | void> {
    try {
        const featuresPerClient = `${settingsApiEndpoint}/${clientId}`;
        const response = await fetch(featuresPerClient);
        const featuresPromise = await response.json();

        if (featuresPromise.length) {
            return featuresPromise;
        }
    } catch (error) {
        logger.error(error);
    }
}
