import {Client, Feature} from "../types/api.types";

export const mockedClientList:Array<Client> = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
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
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
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
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
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
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
    },
];

export const mockedClientListWithHasFeatures:Array<Client> = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
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
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
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
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
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
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
];

export const mockedFilteredList:Array<Client> = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "id": 1,
                "name": "traffective",
                "client": "ENABLED",
                "category": "NONE",
                "tag": "ENABLED",
            },
            {
                "id": 2,
                "name": "inArticleReco",
                "client": "DISABLED",
                "category": "ENABLED",
                "tag": "ENABLED",
            },
            {
                "id": 3,
                "name": "cleverPush",
                "client": "ENABLED",
                "category": "ENABLED_AND_DISABLED",
                "tag": "NONE",
            },
            {
                "id": 4,
                "name": "paywall",
                "client": "ENABLED",
                "category": "DISABLED",
                "tag": "ENABLED",
            },
        ],
        "hasFeatures": true,
    },
];

export const mockedFeatures:Array<Feature> = [
    {
        "id": 1,
        "name": "traffective",
        "client": "ENABLED",
        "category": "NONE",
        "tag": "ENABLED",
    },
    {
        "id": 2,
        "name": "inArticleReco",
        "client": "DISABLED",
        "category": "DISABLED",
        "tag": "DISABLED",
    },
    {
        "id": 3,
        "name": "cleverPush",
        "client": "ENABLED",
        "category": "NONE",
        "tag": "NONE",
    },
];

export const mockedFilteredFeatures:Array<Feature> = [
    {
        "id": 1,
        "name": "traffective",
        "client": "DISABLED",
        "category": "NONE",
        "tag": "DISABLED",
    },
    {
        "id": 2,
        "name": "inArticleReco",
        "client": "DISABLED",
        "category": "NONE",
        "tag": "DISABLED",
    },
];
