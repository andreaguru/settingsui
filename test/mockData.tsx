import {Client, Feature, FeatureList} from "../types/api.types";

// TODO: Is it clearer to write Array<Client> ?
/* ANSWER: not sure about it. I choose the short form to put more focus on the interface (Client)
But we can discuss it. In case, we need to change it everywhere in the project */
export const mockedClientList:Client[] = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
    },
    {
        "id": 252,
        "name": "webnachrichten.de",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
    },
    {
        "id": 290,
        "name": "meine-anzeigenzeitung.de",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
    },
    {
        "id": 315,
        "name": "Wetterauer Zeitung",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
    },
];

export const mockedClientListWithHasFeatures:Client[] = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
    {
        "id": 252,
        "name": "webnachrichten.de",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
    {
        "id": 290,
        "name": "meine-anzeigenzeitung.de",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
    {
        "id": 315,
        "name": "Wetterauer Zeitung",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
];

export const mockedFilteredList:Client[] = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
];

export const mockedFeatures:Feature[] = [
    {
        "name": "traffective",
        "client": "DISABLED",
        "category": "NONE",
        "tag": "DISABLED",
    },
    {
        "name": "inArticleReco",
        "client": "DISABLED",
        "category": "DISABLED",
        "tag": "DISABLED",
    },
    {
        "name": "cleverPush",
        "client": "ENABLED",
        "category": "NONE",
        "tag": "NONE",
    },
];

export const mockedFilteredFeatures:FeatureList[] = [
    {
        "id": 1,
        "name": "traffective",
    },
    {
        "id": 2,
        "name": "inArticleReco",
    },
];
