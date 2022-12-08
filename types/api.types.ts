export interface Image {
    defaultContentImageRatio: string;
}

export interface SeoStoryTicker {
    activated: boolean;
}

export interface Feature {
    name: string;
    client: boolean;
    category: boolean|null;
    tag: boolean|null;
}

export interface Clients {
    id: number;
    name: string;
    features?: Feature[];
}

