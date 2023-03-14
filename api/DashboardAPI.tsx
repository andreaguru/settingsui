import {logger} from "../logger";
import {Client} from "../types/api.types";

// get the endpoint from the environment variables
const apiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_ENDPOINT || "";

/**
 * Get the complete list of the clients.
 * @return {Promise<Array<Client>>}
 * @constructor
 */
export async function getClientList():Promise<Array<Client> | void> {
    try {
        const response = await fetch(apiEndpoint);

        // return two arrays with the data from the two fetch requests
        const clientsPromise:Array<Client> = await response.json();

        // filter the result in order to show only clients that have a name
        if (clientsPromise.length) {
            const clientArray = clientsPromise.filter((client: Client) => client.name) as Array<Client>;
            clientArray.sort((clientPrev, clientNext) => clientPrev.name.localeCompare(clientNext.name));
            return clientArray;
        }
    } catch (error) {
        logger.error(error);
    }
}
