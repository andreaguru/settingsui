/*
Interfaces for the APIs Data
*/

import {RJSFSchema} from "@rjsf/utils";

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

enum CmsType {
    PLACE_LOCATION = "PLACE_LOCATION",
    EVENT = "EVENT",
    ORGANISATION = "ORGANISATION",
    PERSON = "PERSON",
    CATCHWORD = "CATCHWORD",
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

export interface Settings {
    name?: string;
    links?: Array<SettingsLink>;
    value?: string;
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

export interface FeaturesConfigAPI {
    id: number;
    name: string;
    clientId: number;
    settings: Array<Settings>;
}

export interface FeaturesConfig extends FeaturesConfigAPI {
    usages: Array<Usage>;
}

export interface FeaturesDetail {
    id: number;
    name: string;
    key: string;
    shortName: string;
    jsonSchema: RJSFSchema;
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

export interface CmsCategories {
    clientId: number;
    category: CmsCategory;
}

export interface CmsCategory {
    id: number;
    name:string;
    path: string;
    children?: Array<CmsCategory>;
}

export interface CmsTag {
    id: number;
    name:string;
    type: CmsType;
    clientId: number;
}

export interface CategoryMap {
    id: number;
    name:string;
}

