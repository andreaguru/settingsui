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
