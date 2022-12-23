/*
Interfaces for the APIs Data
*/

// TODO: Remove unused types + Add missing types (e.g. client- and feature-response)
export interface Image {
    defaultContentImageRatio: string;
}

export interface SeoStoryTicker {
    activated: boolean;
}

export interface Feature {
    name: string;
    client: string;
    category: string;
    tag: string;
}
// TODO: Rename to "Client"
export interface Clients {
    id: number;
    name: string;
    features: Feature[];
    hasFeatures?: boolean;
}

export interface FeaturesList {
    id: number;
    name: string;
}

