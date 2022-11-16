import {ClientsInterface} from "../types/query.types";
/**
 *
 * @constructor
 */
export async function getIntegratedClientList() {
    try {
        const response = await fetch("http://localhost:3004/clients");

        // return two arrays with the data from the two fetch requests
        const clientsPromise = await response.json();

        // filter the result in order to show only clients that have a name
        return clientsPromise.filter((client: ClientsInterface) => client.name);
    } catch {
        throw Error("Promise failed");
    }
}
