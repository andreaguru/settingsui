/*
Interfaces for the APIs Data
*/

// TODO: Remove unused types + Add missing types (e.g. client- and feature-response)
/* ANSWER: I created a type ClientOrFeatureList that will cover all the cases where both Client and Feature interfaces are needed.
Is this what you mean? */

export interface Feature {
    name: string;
    client: string;
    category: string;
    tag: string;
}

export interface Client {
    id: number;
    name: string;
    features: Feature[];
    hasFeatures?: boolean;
}

export interface FeatureList {
    id: number;
    name: string;
    hasFeatures?: boolean;
}

export type ClientOrFeatureList = Client | FeatureList

