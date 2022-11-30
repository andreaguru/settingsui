import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect, {handleCheckbox} from "../components/MultiSelect";
import {ClientsInterface} from "../types/api.types";

const mockedClientList:ClientsInterface[] = [
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

const mockedFilteredList:ClientsInterface[] = [
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

test("checkbox components are not rendered at page load", () => {
    render(<MultiSelect
        values={mockedClientList}
        filteredValues={[]}
        dispatchFilteredValues={() => null} />);

    expect(screen.queryByTestId(241)).toBeFalsy();
});

test("checkbox components are rendered after select change", () => {
    render(<MultiSelect
        values={mockedClientList}
        filteredValues={[]}
        dispatchFilteredValues={() => null} />);

    fireEvent.mouseDown(screen.getByLabelText("ClientID / Name"));
    expect(screen.queryByTestId(241)).toBeInTheDocument();
});

test("checkbox are checked when their values are present in filteredClients", () => {
    render(<MultiSelect
        values={mockedClientList}
        filteredValues={mockedFilteredList}
        dispatchFilteredValues={() => null} />);

    fireEvent.mouseDown(screen.getByLabelText("ClientID / Name"));
    expect(screen.queryByTestId(241)).toHaveClass("Mui-checked");
});

/* Unit Tests */

test("handleCheckbox - returns true if the value is present in the filtered list", () => {
    expect(handleCheckbox(241, mockedFilteredList)).toBe(true);
});

/* test("getIdAndNameFromList - returns a stringified object with only id and name as properties", () => {
    const client = {
        "id": 241,
        "advert": {
            "adMarkerHeight": 0,
            "adDefendActivated": false,
            "traffective": {
                "dfpAdUrl": "1",
            },
        },
        "amp": {
            "activated": true,
        },
        "author": {
            "showAuthorLinks": false,
        },
        "comment": {
            "disqus": {
                "shortname": "string",
            },
        },
        "image": {
            "defaultContentImageRatio": "DEFAULT",
        },
        "widgets": {
            "inArticleReco": {
                "activated": false,
            },
            "cxo": {
                "activated": true,
            },
            "newsletter": {
                "activated": true,
                "campaignId": 0,
                "newsletterName": "string",
                "options": "string",
            },
            "glomex": {
                "activated": true,
                "integrationId": "string",
            },
        },
        "seoStoryTicker": {
            "activated": true,
        },
        "paywall": {
            "activated": true,
            "storyElementsBeforePaywall": 0,
        },
        "googleTagManager": {
            "activated": true,
            "gtmContainerId": "string",
        },
        "name": "BlickPunkt Nienburg",
        "alias": "blickpunkt-nienburg-de",
        "identifier": "https://www.blickpunkt-nienburg.de",
        "googleNewsName": "BlickPunkt Nienburg",
        "artworkDirectory": "blickpunkt-nienburg-de",
    };
    const expectedValue = "{\"id\":241,\"name\":\"BlickPunkt Nienburg\"}";
    expect(getIdAndNameFromList(client)).toBe(expectedValue);
}); */

