import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "../components/MainContent";
import {Clients} from "../types/api.types";

// TODO: This is duplicate. Move outside or use mocking-data?
const mockedClientList:Clients[] = [
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
    {
        "id": 249,
        "name": "Remscheider General-Anzeiger",
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

const mockedFilteredList:Clients[] = [
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
];

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}
        filteredFeatures={[]}
        featureStatus={""}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<MainContent
        clientsList={mockedClientList}
        filteredClientsList={[]}
        filteredFeatures={[]}
        featureStatus={""}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if the first is not empty", () => {
    render(<MainContent
        clientsList={mockedClientList}
        filteredClientsList={mockedFilteredList}
        filteredFeatures={[]}
        featureStatus={""}/>);

    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

// TODO: Add more tests here: showFeaturesPerStatus, showSelectedFeatures, showFeatureStatus, ...
