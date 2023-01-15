import {logger} from "../logger";
import {Client} from "../types/api.types";

// get the endpoint from the environment variables
const apiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_ENDPOINT || "";

/**
 * Get the complete list of the clients.
 * @return {Promise<Array<Client>>}
 * @constructor
 */
export async function getClientList():Promise<Array<Client> | undefined> {
    try {
        // TODO: Add type to variable-declaration --> define response object in type-definition
        /* ANSWER: I added types for the return value and response.json().
       Also add a type for the return of getClientList, in this case type is Promise<Array<Client> | undefined>
         as the function can return undefined in case of Error */
        const response = await fetch(apiEndpoint);

        // return two arrays with the data from the two fetch requests
        const clientsPromise:Array<Client> = await response.json();

        // filter the result in order to show only clients that have a name
        if (clientsPromise.length) {
            return clientsPromise.filter((client: Client) => client.name) as Array<Client>;
        }
    } catch (error) {
        logger.error(error);
    }
}
