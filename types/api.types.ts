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

export interface Clients {
    id: number;
    name: string;
    features?: Feature[];
}

