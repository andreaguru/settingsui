import {logger} from "../logger";
import {FeaturesConfig, FeaturesDetail} from "../types/api.types";

// get the endpoints from the environment variables
const featureDetailEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES;

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} featureId
 * @param {number} clientId
 * @constructor
 */
export async function getFeatureDetailForClient(featureId: number, clientId: number): Promise<FeaturesDetail> {
    try {
        const featureDetailURL = `${featureDetailEndpoint}/${featureId}`;
        const response = await fetch(featureDetailURL);
        const featuresPromise = await response.json();

        // update the configuration list in order to show only configs that are set for a specific client
        const configurations = featuresPromise.configurations
            .filter((config: FeaturesConfig) => config.clientId === clientId);
        return {
            ...featuresPromise,
            configurations,
        };
    } catch (error) {
        logger.error("Could not get Features Details for Feature Id", featureId, error);
        return Promise.reject(error);
    }
}

