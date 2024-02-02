import {logger} from "../logger";

// import Typescript Interfaces
import {Client, Feature} from "../types/api.types";

// get the endpoints from the environment variables
const cmsEndpoint = process.env.NEXT_PUBLIC_API_CLIENTS as string;
const featureListEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES as string;
const settingsApiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_OVERVIEW_BASE as string;

/**
 * Get the complete list of the clients.
 * @return {Promise<Array<Client>>}
 * @constructor
 */
export async function getClientList():Promise<Array<Client>> {
    try {
        const response = await fetch(cmsEndpoint);

        // return two arrays with the data from the two fetch requests
        const clientsPromise:Array<Client> = await response.json();
        clientsPromise.sort((clientPrev, clientNext) => clientPrev.name.localeCompare(clientNext.name));
        return clientsPromise;
    } catch (error) {
        logger.error("Could not get Client List", error);
        return [];
    }
}

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} clientId
 * @constructor
 */
export async function getFeaturesPerClient(clientId:number):Promise<Array<Feature>> {
    try {
        const featuresPerClient = `${settingsApiEndpoint}/${clientId}`;
        const response = await fetch(featuresPerClient);
        const featuresObject = await response.json();
        return featuresObject.feature;
    } catch (error) {
        logger.error("Could not get Features for client {}", clientId, error);
        return [];
    }
}

/**
 * Get complete Feature List.
 * @return {Promise<Array<Client>>}
 * @constructor
 */
export async function getFeaturesListPromise():Promise<Array<Feature>> {
    try {
        const response = await fetch(featureListEndpoint);
        return await response.json();
    } catch (error) {
        logger.error("Could not get Features List", error);
        return [];
    }
}
