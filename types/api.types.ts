export enum ReducerActionType {
    ADD_VALUE = "ADD_VALUE",
    DELETE_VALUE = "DELETE_VALUE"
}

export type ReducerActions =
| {
    type: ReducerActionType.ADD_VALUE;
    payload: ClientsInterface[];
}
| {
    type: ReducerActionType.DELETE_VALUE;
    payload: ClientsInterface;
}

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

export interface ClientsInterface {
    id: number;
    advert: Advert;
    amp: Amp;
    author: Author;
    comment: Comment;
    image: Image;
    name: string;
    widgets: Widgets;
    seoStoryTicker: SeoStoryTicker | null;
    paywall: Paywall | null;
    googleTagManager: GoogleTagManager | null;
}
