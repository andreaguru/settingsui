export enum ReducerActionType {
    UPDATE_VALUE = "UPDATE_VALUE"
}

export type Actions =
 { type: ReducerActionType.UPDATE_VALUE, payload: Clients[] }

export interface Traffective {
    dfpAdUrl: string;
}

export interface Advert {
    adMarkerHeight: number;
    adDefendActivated: boolean;
    traffective: Traffective;
}

export interface Amp {
    activated: boolean;
}

export interface Author {
    showAuthorLinks: boolean;
}

export interface Disqus {
    shortname: string;
}

export interface Comment {
    disqus: Disqus;
}

export interface Image {
    defaultContentImageRatio: string;
}

export interface InArticleReco {
    activated: boolean;
}

export interface Cxo {
    activated: boolean;
}

export interface Newsletter {
    activated: boolean;
    campaignId: number;
    newsletterName: string | null;
    options: string | null;
}

export interface Glomex {
    activated: boolean;
    integrationId: string;
}

export interface Widgets {
    inArticleReco: InArticleReco | null;
    cxo: Cxo | null;
    newsletter: Newsletter;
    glomex: Glomex | null;
}

export interface SeoStoryTicker {
    activated: boolean;
}

export interface Paywall {
    activated: boolean;
    storyElementsBeforePaywall: number;
}

export interface GoogleTagManager {
    activated: boolean;
    gtmContainerId: string;
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
    advert?: Advert;
    amp?: Amp;
    author?: Author;
    comment?: Comment;
    image?: Image;
    widgets?: Widgets;
    seoStoryTicker?: SeoStoryTicker | null;
    paywall?: Paywall | null;
    googleTagManager?: GoogleTagManager | null;
}

