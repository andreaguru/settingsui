/*
Interfaces for the APIs Data
*/

export enum StatusValue {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
    ENABLED_AND_DISABLED = "ENABLED_AND_DISABLED",
    NONE = "NONE"
}

export interface Status {
    client: StatusValue;
    category: StatusValue;
    tag: StatusValue
}

export interface Feature {
    id: number;
    name: string;
    key: string;
    status: Status;
}

export interface Client {
    id: number;
    name: string;
    features: Array<Feature>;
    hasFeatures?: boolean;
}

export interface FeaturesDetail {
    id: number;
    name: string;
    key: string;
    shortName: string;
    description: string;
    configurations: Array<string>;
}

export interface Usage {
    id: {
        clientId: number;
        categoryId: number;
        tagId: number;
        configurationId: number;
    };
    active: boolean;
}

export interface UsageWithConfigName extends Usage {
    configurationName: string;
}

export type ClientOrFeature = Client | Feature

export interface CategoryMap {
    id: number;
    name:string;
}

