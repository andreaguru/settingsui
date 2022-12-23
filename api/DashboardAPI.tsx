import {Clients} from "../types/api.types";

// get the endpoint from the environment variables
const apiEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_ENDPOINT || "";
const featuresEndpoint = process.env.NEXT_PUBLIC_FEATURES_API_ENDPOINT || "";

/**
 * Get the complete list of the clients.
 *
 * @constructor
 */
// TODO: Add type to function-declaration --> define return value in type-definition
// TODO: Why "Integrated" ?
export async function getIntegratedClientList() {
    try {
        // TODO: Add type to variable-declaration --> define response object in type-definition
        const response = await fetch(apiEndpoint);

        // return two arrays with the data from the two fetch requests
        // TODO: Add type to variable-declaration --> define response object in type-definition
        const clientsPromise = await response.json();

        // filter the result in order to show only clients that have a name
        return clientsPromise.filter((client: Clients) => client.name);
    } catch {
        // TODO: Logging not clear --> add a more concrete log
        // TODO: Add logger-framework to enable log-level (e.g. pino - https://github.com/pinojs/pino)
        throw Error("Promise failed");
    }
}

/**
 *
 * @constructor
 */
// TODO: Add type to function-declaration --> define return value in type-definition
export async function getFeaturesList() {
    try {
        // TODO: Add type to variable-declaration --> define response object in type-definition
        const response = await fetch(featuresEndpoint);

        // return features list
        // TODO: Add type to variable-declaration --> define response object in type-definition
        return await response.json();
    } catch {
        // TODO: Logging not clear --> add a more concrete log
        // TODO: Add logger-framework to enable log-level (e.g. pino - https://github.com/pinojs/pino)
        throw Error("Promise failed");
    }
}
