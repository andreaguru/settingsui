/*
Interfaces for the APIs Data
*/

export interface Feature {
    id: number;
    name: string;
    label: string;
    client: string;
    category: string;
    tag: string;
}

export interface Client {
    id: number;
    name: string;
    features: Array<Feature>;
    hasFeatures?: boolean;
}

export type ClientOrFeature = Client | Feature

