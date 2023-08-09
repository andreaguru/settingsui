/*
Interfaces for the APIs Data
*/

export enum StatusValue {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
    ENABLED_AND_DISABLED = "ENABLED_AND_DISABLED",
    NONE = "NONE"
}

export enum ElementType {
    TEXT_LINK = "TEXT_LINK",
    SEARCH_LINK = "SEARCH_LINK",
}

interface Status {
    client: StatusValue;
    category: StatusValue;
    tag: StatusValue
}

export interface Feature {
    id: number;
    name: string;
    technicalName: string;
    status: Status;
}

export interface Client {
    id: number;
    name: string;
    features: Array<Feature>;
    hasFeatures?: boolean;
}

export interface Settings {
    name?: string;
    links?: Array<SettingsLink>;
    value?: string;
}

export interface FeaturesConfig {
    id: number;
    name: string;
    clientId: number;
    settings: Array<Settings>;
    usages: [];
}

export interface FeaturesDetail {
    id: number;
    name: string;
    technicalName: string;
    abbreviation: string;
    description: string;
    configurations: Array<FeaturesConfig>;
}

export type ClientOrFeature = Client | Feature

export type SettingsLink = {
    name: string,
    url: string,
    modifierClassExtension?: string | null,
    elementType?: ElementType,
}
