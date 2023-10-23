import {logger} from "../logger";
import {CategoryMap, CmsCategory, FeaturesConfig, FeaturesDetail, Usage, UsageWithConfigName} from "../types/api.types";

// get the endpoints from the environment variables
const featureDetailEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES as string;
const featureUsagesEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_USAGES as string;
const cmsEndpoint = process.env.NEXT_PUBLIC_CMS_API_CLIENTS as string;

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} featureId
 * @param {number} clientId
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
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error("Could not get Features Details for Feature Id", featureId, error);
        return Promise.reject(error);
    }
}

/**
 * getUsagesPerFeature
 * @param {Array<FeaturesConfig>} featuresDetailConfig
 * @return {Promise<Array<UsageWithConfigName>>}
 */
export async function getUsagesPerFeature(featuresDetailConfig: Array<FeaturesConfig>) {
    try {
        const response = await fetch(featureUsagesEndpoint);
        const featureUsagesPromise = await response.json();

        // create an array of configurations Ids
        const configurationIds: Array<number> = featuresDetailConfig.map((a) => a.id);

        // filter the result in order to show only clients that have a name and that are not in the black list
        const usageArrayTemp: Array<Usage> = featureUsagesPromise.filter((usage: Usage) => {
            return configurationIds.includes(usage.id.configurationId);
        });

        return usageArrayTemp.map((usage): UsageWithConfigName => {
            return {
                configurationName: featuresDetailConfig.filter((data) => data.id === usage.id.configurationId)[0].name,
                ...usage,
            };
        });
    } catch (error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error(error);
        return [];
    }
}

/**
 * getCategoryList
 * @param {number} clientId
 * @return {Promise<Array<CategoryMap>>}
 */
export async function getCategoryList(clientId: number) {
    try {
        const response = await fetch(`${cmsEndpoint}/${clientId}/categories`);
        const categoryListPromise = await response.json();
        const categoryList: CmsCategory = categoryListPromise.category;
        const categoryMap: Array<CategoryMap> = [];

        categoryMap.push({
            id: categoryList.id,
            name: categoryList.name,
        });

        categoryList?.children?.forEach(function(category: CmsCategory) {
            categoryMap.push({
                id: category.id,
                name: category.name,
            });
            if (category.children) {
                category.children.forEach(function(category: CmsCategory) {
                    categoryMap.push({
                        id: category.id,
                        name: category.name,
                    });
                });
            }
        });

        return categoryMap;
    } catch (error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error(error);
        return [];
    }
}
