import {logger} from "../logger";
import {
    CategoryMap,
    CmsCategories,
    CmsCategory,
    CmsTag,
    FeaturesConfig,
    FeaturesDetail,
    Usage,
    UsageWithConfigName,
} from "../types/api.types";

// get the endpoints from the environment variables
const featureDetailEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES as string;
const configurationsEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_CONFIGURATIONS as string;
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
        const featureDetail:FeaturesDetail = await response.json();

        const configurationsURL = `${configurationsEndpoint}/client/${clientId}/feature/${featureId}`;
        const configResponse = await fetch(configurationsURL);
        const configurationsAPI: Array<FeaturesConfig> = await configResponse.json();

        const usagePromise = await fetch(`${featureUsagesEndpoint}/client/${clientId}/feature/${featureId}`);
        const usages: Array<Usage> = await usagePromise.json();

        const configurations = configurationsAPI.map((config: FeaturesConfig): FeaturesConfig => {
            return {
                usages: usages.filter((usage) => usage.id.configurationId === config.id),
                ...config,
            };
        });

        // update the configuration list in order to show also the configs
        return {
            ...featureDetail,
            configurations: configurations,
        };
    } catch (error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error("Could not get Features Details for Feature Id", featureId, error);
        return Promise.reject(error);
    }
}

/**
 * getUsagesPerFeature
 * @param {number} clientId
 * @param {number} featureId
 * @param {Array<FeaturesConfig>} featuresDetailConfigSelected
 * @return {Promise<Array<UsageWithConfigName>>}
 */
export async function getUsagesPerFeature(clientId: number,
    featureId: number,
    featuresDetailConfigSelected: Array<FeaturesConfig>) {
    try {
        const response = await fetch(`${featureUsagesEndpoint}/client/${clientId}/feature/${featureId}`);
        let usages: Array<Usage> = await response.json();
        if (featuresDetailConfigSelected.length) {
            // create an array of configurations Ids
            const configurationIds: Array<number> = featuresDetailConfigSelected.map((a) => a.id);

            // filter the usages in order to show only the ones related to the selected configs
            usages = usages.filter((usage: Usage) => {
                return configurationIds.includes(usage.id.configurationId);
            });
        }
        return usages.map((usage): UsageWithConfigName => {
            return {
                configurationName: featuresDetailConfigSelected
                    .filter((data) => data.id === usage.id.configurationId)[0].name,
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
        const categoryListPromise: CmsCategories = await response.json();
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

/**
 * getTagList
 * @param {number} clientId
 * @return {Promise<Array<CategoryMap>>}
 */
export async function getTagList(clientId: number) {
    try {
        const response = await fetch(`${cmsEndpoint}/${clientId}/tags`);
        const tagListPromise: Array<CmsTag> = await response.json();
        return tagListPromise;
    } catch (error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error(error);
        return [];
    }
}
