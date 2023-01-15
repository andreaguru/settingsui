/*
Interfaces for the APIs Data
*/

// TODO: Remove unused types + Add missing types (e.g. client- and feature-response)
/* ANSWER: I created a type ClientOrFeature that will cover all the cases
where both Client and Feature interfaces are needed.
Is this what you mean? */

export interface Feature {
    id: number;
    name: string;
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

