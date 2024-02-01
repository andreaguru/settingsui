import {logger} from "../logger";
import {FeaturesDetail,} from "../types/api.types";

// get the endpoints from the environment variables
const featureDetailEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES as string;

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} featureId
 */
export async function getFeatureDetailForClient(featureId: number): Promise<FeaturesDetail> {
    try {
        const featureDetailURL = `${featureDetailEndpoint}/${featureId}`;
        const response = await fetch(featureDetailURL);
        return await response.json();
    } catch (error) {
        logger.error("Could not get Features Details for Feature Id", featureId, error);
        return Promise.reject(error);
    }
}

