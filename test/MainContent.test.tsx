import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "../components/MainContent";
import {Clients} from "../types/api.types";

const mockedClientList:Clients[] = [
    {
        "id": 241,
        "name": "BlickPunkt Nienburg",
        "features": [
            {
                "name": "traffective",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "inArticleReco",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "cleverPush",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "paywall",
                "client": true,
                "category": false,
                "tag": null,
            },
        ],
    },
    {
        "id": 252,
        "name": "webnachrichten.de",
        "features": [
            {
                "name": "traffective",
                "client": true,
                "category": null,
                "tag": true,
            },
            {
                "name": "inArticleReco",
                "client": true,
                "category": true,
                "tag": false,
            },
            {
                "name": "cleverPush",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "paywall",
                "client": true,
                "category": false,
                "tag": null,
            },
        ],
    },
    {
        "id": 290,
        "name": "meine-anzeigenzeitung.de",
        "features": [
            {
                "name": "traffective",
                "client": true,
                "category": false,
                "tag": true,
            },
            {
                "name": "inArticleReco",
                "client": true,
                "category": true,
                "tag": null,
            },
            {
                "name": "cleverPush",
                "client": true,
                "category": false,
                "tag": true,
            },
            {
                "name": "paywall",
                "client": true,
                "category": true,
                "tag": true,
            },
        ],
    },
    {
        "id": 315,
        "name": "Wetterauer Zeitung",
        "features": [
            {
                "name": "traffective",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "inArticleReco",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "cleverPush",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "paywall",
                "client": true,
                "category": true,
                "tag": true,
            },
        ],
    },
    {
        "id": 249,
        "name": "Remscheider General-Anzeiger",
        "features": [
            {
                "name": "traffective",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "inArticleReco",
                "client": true,
                "category": false,
                "tag": false,
            },
            {
                "name": "cleverPush",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "paywall",
                "client": true,
                "category": true,
                "tag": true,
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
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "inArticleReco",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "cleverPush",
                "client": true,
                "category": false,
                "tag": null,
            },
            {
                "name": "paywall",
                "client": true,
                "category": false,
                "tag": null,
            },
        ],
    },
];

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<MainContent
        clientsList={mockedClientList}
        filteredClientsList={[]}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if the first is not empty", () => {
    render(<MainContent
        clientsList={mockedClientList}
        filteredClientsList={mockedFilteredList}/>);

    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});
