import {Client, Feature, StatusValue} from "../types/api.types";

export const mockedClientList:Array<Client> = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "id": 1,
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
        ],
    },
    {
        "id": 252,
        "name": "webnachrichten.de",
        "features": [
            {
                "id": 1,
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
        ],
    },
    {
        "id": 290,
        "name": "meine-anzeigenzeitung.de",
        "features": [
            {
                "id": 1,
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
        ],
    },
    {
        "id": 315,
        "name": "Wetterauer Zeitung",
        "features": [
            {
                "id": 1,
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
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
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
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
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
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
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
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
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
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
                "name": "Traffective Ads",
                "key": "traffective",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.NONE,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 2,
                "name": "ECR In Article",
                "key": "inArticleReco",
                "status": {
                    "client": StatusValue.DISABLED,
                    "category": StatusValue.ENABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
            {
                "id": 3,
                "name": "CleverPush",
                "key": "cleverpush",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.ENABLED_AND_DISABLED,
                    "tag": StatusValue.NONE,
                },
            },
            {
                "id": 4,
                "name": "Paywall",
                "key": "paywall",
                "status": {
                    "client": StatusValue.ENABLED,
                    "category": StatusValue.DISABLED,
                    "tag": StatusValue.ENABLED,
                },
            },
        ],
        "hasFeatures": true,
    },
];

export const mockedFeatures:Array<Feature> = [
    {
        "id": 1,
        "name": "Traffective Ads",
        "key": "traffective",
        "status": {
            "client": StatusValue.ENABLED,
            "category": StatusValue.NONE,
            "tag": StatusValue.ENABLED,
        },
    },
    {
        "id": 2,
        "name": "ECR In Article",
        "key": "inArticleReco",
        "status": {
            "client": StatusValue.DISABLED,
            "category": StatusValue.DISABLED,
            "tag": StatusValue.DISABLED,
        },
    },
    {
        "id": 3,
        "name": "CleverPush",
        "key": "cleverpush",
        "status": {
            "client": StatusValue.ENABLED,
            "category": StatusValue.NONE,
            "tag": StatusValue.NONE,
        },
    },
];

export const mockedFilteredFeatures:Array<Feature> = [
    {
        "id": 1,
        "name": "Traffective Ads",
        "key": "traffective",
        "status": {
            "client": StatusValue.DISABLED,
            "category": StatusValue.NONE,
            "tag": StatusValue.DISABLED,
        },
    },
    {
        "id": 2,
        "name": "ECR In Article",
        "key": "inArticleReco",
        "status": {
            "client": StatusValue.DISABLED,
            "category": StatusValue.NONE,
            "tag": StatusValue.DISABLED,
        },
    },
];

export const mockedFeatureDetailForClient = {
    "id": 6,
    "name": "CleverPush",
    "key": "cleverPush",
    "shortName": "cleverPush",
    "description": "Test Clever Push Feature",
    "configurations": [
        {
            "id": 11,
            "name": "dfb_gws",
            "clientId": 268,
            "settings": [
                {
                    "name": "campaign id",
                    "value": "Gztrefghzuk",
                },
                {
                    "name": "darsellung",
                    "value": "Im Artikel",
                },
                {
                    "name": "Widget Höhe desktop",
                    "value": "302 px",
                },
                {
                    "name": "Widget Höhe mobile",
                    "value": "335 px",
                },
                {
                    "name": "loaderId",
                    "value": "72gdthfjlöe",
                },
            ],
            "usages": [
                {
                    "id": {
                        "clientId": 0,
                        "categoryId": 123,
                        "tagId": 0,
                        "configurationId": 11,
                    },
                    "active": true,
                },
                {
                    "id": {
                        "clientId": 0,
                        "categoryId": 456,
                        "tagId": 0,
                        "configurationId": 11,
                    },
                    "active": true,
                },
            ],
        },
        {
            "id": 12,
            "name": "daily",
            "clientId": 268,
            "settings": [
                {
                    "name": "campaign id",
                    "value": "Gztrefghzuk",
                },
                {
                    "name": "darsellung",
                    "value": "Im Artikel",
                },
                {
                    "name": "Widget Höhe desktop",
                    "value": "302 px",
                },
                {
                    "name": "Widget Höhe mobile",
                    "value": "335 px",
                },
                {
                    "name": "loaderId",
                    "value": "72gdthfjlöe",
                },
            ],
            "usages": [
                {
                    "id": {
                        "clientId": 268,
                        "categoryId": 0,
                        "tagId": 0,
                        "configurationId": 12,
                    },
                    "active": true,
                },
            ],
        },
        {
            "id": 13,
            "name": "Einfach Tasty",
            "clientId": 268,
            "settings": [
                {
                    "name": "campaign id",
                    "value": "Gztrefghzuk",
                },
                {
                    "name": "darsellung",
                    "value": "Im Artikel",
                },
                {
                    "name": "Widget Höhe desktop",
                    "value": "302 px",
                },
                {
                    "name": "Widget Höhe mobile",
                    "value": "335 px",
                },
                {
                    "name": "loaderId",
                    "value": "72gdthfjlöe",
                },
            ],
            "usages": [
                {
                    "id": {
                        "clientId": 0,
                        "categoryId": 789,
                        "tagId": 0,
                        "configurationId": 13,
                    },
                    "active": false,
                },
            ],
        },
    ],
};


