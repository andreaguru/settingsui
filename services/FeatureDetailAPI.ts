import {
    BaseFeaturesConfig,
    CategoryMap,
    CmsCategories,
    CmsCategory,
    CmsTag,
    FeaturesConfig,
    FeaturesDetail,
    Usage,
    UsageToModifyOrDelete,
    UsageWithConfigName,
} from "types/api.types";
import useSWR from "swr";
import { fetcher } from "utils/utils";
import logger from "../logger";

// get the endpoints from the environment variables
const featureDetailEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_FEATURES ?? "";
const configurationsEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_CONFIGURATIONS ?? "";
const cmsEndpoint = process.env.NEXT_PUBLIC_CMS_API_CLIENTS ?? "";
// We export this endpoint as we need it in featurekey page
export const featureUsagesEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_USAGES ?? "";

/**
 * Get Feature List for a specific client.
 * @return {Promise<Array<Client>>}
 * @param {number} featureId
 * @param {number} clientId
 */
export async function getFeatureDetailForClient(
    featureId: number | undefined,
    clientId: number,
): Promise<FeaturesDetail> {
    try {
        const featureDetailURL = `${featureDetailEndpoint}/${featureId}`;
        const response = await fetch(featureDetailURL);
        const featureDetail: FeaturesDetail = await response.json() as FeaturesDetail;

        const configurationsURL = `${configurationsEndpoint}/client/${clientId}/feature/${featureId}`;
        const configResponse = await fetch(configurationsURL);
        const configurationsAPI: FeaturesConfig[] = await configResponse.json() as FeaturesConfig[];

        const usagePromise = await fetch(`${featureUsagesEndpoint}/client/${clientId}/feature/${featureId}`);
        const usages: Usage[] = await usagePromise.json() as Usage[];

        const configurations = configurationsAPI.map((config: FeaturesConfig): FeaturesConfig => ({
            usages: usages.filter(usage => usage.id.configurationId === config.id),
            ...config,
        }));

        // update the configuration list in order to show also the configs
        return {
            ...featureDetail,
            configurations,
        };
    } catch(error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error(error, `Could not get Features Details for Feature Id ${featureId}`);
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
}

/**
 * Get Usages for a specific feature and client.
 * @param {number} clientId
 * @param {number} featureId
 * @param {Array<FeaturesConfig>} featuresDetailConfigSelected
 * @return {Promise<Array<UsageWithConfigName>>}
 */
export function useUsagesPerFeature(
    clientId: number,
    featureId: number,
    featuresDetailConfigSelected: FeaturesConfig[],
): UsageWithConfigName[] {
    let usages: UsageWithConfigName[] = [];
    
    const { data, error } = useSWR<UsageWithConfigName[], Error>(
        `${featureUsagesEndpoint}/client/${clientId}/feature/${featureId}`,
        fetcher,
        {
            revalidateOnMount: true,
        },
    );

    if (error) {
        logger.error(error, `Could not get Usages for client ${clientId} and feature ${featureId}`);
    }

    if (featuresDetailConfigSelected.length) {
        // create an array of configurations Ids.
        const configurationIds: number[] =
            featuresDetailConfigSelected.map((ftrConfig: FeaturesConfig) => ftrConfig.id);

        // filter the usages in order to show only the ones related to the selected configs
        usages = data?.filter((usage: Usage) => configurationIds.includes(usage.id.configurationId)) ?? [];
    }

    return usages?.map((usage: Usage): UsageWithConfigName => ({
        configurationName:
            featuresDetailConfigSelected
                .find(data => data.id === usage.id.configurationId)?.name ?? "",
        ...usage,
    }));
}

/**
 * Deletes feature usages based on the given object.
 *
 *
 * @return {Promise<void>} - Promise that resolves with no value on success.
 * @param usage
 */
export async function deleteUsagesPerFeature(usage: Usage) {
    try {
        await fetch(
            `${featureUsagesEndpoint}?client-id=${usage.id.clientId}&category-id=${usage.id.categoryId}` +
            `&tag-id=${usage.id.tagId}&configuration-id=${usage.id.configurationId}`,
            {
                method: "DELETE",
            },
        );
        return true;
    } catch(error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error(error);
        return [];
    }
}

export function collectCategoriesToArray(category: CmsCategory, categoryMap: CategoryMap[]) {
    categoryMap.push({
        id: category.id,
        name: category.name,
    });
    if (category.children) {
        category.children.forEach((childCategory: CmsCategory) => {
            collectCategoriesToArray(childCategory, categoryMap);
        });
    }
}

/**
 * Updates the usage status of a selected usage.
 */
export async function editUpdateUsageStatus(selectedUsage: UsageToModifyOrDelete): Promise<Response | void> {
    const { usage } = selectedUsage;

    try {
        return await fetch(
            `${featureUsagesEndpoint}?client-id=${usage.id.clientId}&category-id=${usage.id.categoryId}` +
            `&tag-id=${usage.id.tagId}&configuration-id=${usage.id.configurationId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usage),
            },
        );
    } catch(error) {
        // TODO: we will improve the error handling in scope of Ticket https://jira.ippen.io/browse/WEST-1410
        logger.error(error);
        return Promise.reject(new Error("Error"));
    }
}

/**
 * getCategoryList
 * @param {number} clientId
 * @return {Array<CategoryMap>}
 */
export function useCategoryList(clientId: number): CategoryMap[] {
    const { data, error, isLoading } =
        useSWR<CmsCategories, Error>(`${cmsEndpoint}/${clientId}/categories`, fetcher);
    if (error) {
        logger.error(error, `Could not get Categories for client ${clientId}`);
        return [];
    }
    if (isLoading) {
        return [];
    }
    const categoryMap: CategoryMap[] = [];

    if (data) {
        const rootCategory: CmsCategory = data.category;
        collectCategoriesToArray(rootCategory, categoryMap);
    }
    return categoryMap;
}

/**
 * getTagList
 * @param {number} clientId
 * @return {Array<CategoryMap>}
 */
export function useTagList(clientId: number): CmsTag[] {
    const { data, error, isLoading } = useSWR<CmsTag[], Error>(`${cmsEndpoint}/${clientId}/tags`, fetcher);
    if (error) {
        logger.error(error, `Could not get Tags for client ${clientId}`);
        return [];
    }
    if (isLoading) {
        return [];
    }
    return data ?? [];
}

/**
 * Updates the usage status of a selected usage.
 */
export async function updateConfiguration(configuration: FeaturesConfig | undefined) {
    if (!configuration) {
        throw new Error("Die Konfiguration wurde nicht gefunden");
    }
    return fetch(`${configurationsEndpoint}/${configuration.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(configuration),
    });
}

/**
 * Create usage based on form data.
 *
 * @param {FormData} formData - The form data containing information needed to create the usage.
 * @returns {Promise<Response>} A promise that resolves to a response from the API call to create the usage.
 */
export async function createUsage(formData: FormData): Promise<Response> {
    const clientId = formData.get("client-id");
    const categoryId = formData.get("category-id");
    const tagId = formData.get("tag-id");
    const configruationId = formData.get("configurationId");
    const isActive = formData.get("status") === "on";

    const newUsage = {
        id: {
            clientId: clientId ?? 0,
            categoryId: categoryId ?? 0,
            tagId: tagId ?? 0,
            configurationId: configruationId,
        },
        active: isActive,
    };

    return fetch(`${featureUsagesEndpoint}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsage),
    });
}

export async function createConfiguration(formData: Record<string, unknown>): Promise<Response> {
    const { configFixedInfosWrapper, ...settings } = formData;
    const { clientId, configName, featureId } = configFixedInfosWrapper as {
        configName: string
        clientId: number
        featureId: number
    };

    const newConfiguration: BaseFeaturesConfig = {
        name: configName,
        clientId,
        featureId,
        settings,
    };

    return fetch(`${configurationsEndpoint}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newConfiguration),
    });
}

/**
 * Delete a configuration.
 */
export async function deleteConfiguration(configurationId: number) {
    try {
        const response = await fetch(
            `${configurationsEndpoint}/${configurationId}`,
            {
                method: "DELETE",
            },
        );
        
        if (!response.ok) {
            throw new Error(`Failed to delete configuration with ID ${configurationId}`);
        }
        
        return true;
    } catch(error) {
        logger.error(error);
        throw error;
    }
}
