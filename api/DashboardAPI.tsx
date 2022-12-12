import {Clients} from "../types/api.types";

const apiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_ENDPOINT || "";
const apiEndpoint2 = process.env.NEXT_PUBLIC_TESTO || "";
const apiEndpoint3 = process.env.NEXT_PUBLIC_TESTO_DUE || "";
const apiEndpoint4 = process.env.NEXT_PUBLIC_TEST || "";
/**
 *
 * @constructor
 */
export async function getIntegratedClientList() {
    try {
        const response = await fetch(apiEndpoint);

        // return two arrays with the data from the two fetch requests
        const clientsPromise = await response.json();

        // filter the result in order to show only clients that have a name
        return clientsPromise.filter((client: Clients) => client.name);
    } catch {
        throw Error("Promise failed");
    }
}
