import {logger} from "../logger";
import {FeaturesDetail} from "../types/api.types";

// get the endpoints from the environment variables
const featureDetailEndpoint = process.env.NEXT_PUBLIC_FEATURE_DETAIL || "";

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} featureId
 * @constructor
 */
export async function getFeatureDetail(featureId:number):Promise<FeaturesDetail | void> {
    try {
        const featureDetailURL = `${featureDetailEndpoint}/${featureId}`;
        const response = await fetch(featureDetailURL);
        const featureDetailPromise = await response.json();

        if (Object.keys(featureDetailPromise).length) {
            return featureDetailPromise;
        }
    } catch (error) {
        logger.error(error);
    }
}
