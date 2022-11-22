import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../components/Sidebar";

const mockedClientList = [
    {
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
    },
    {
        "id": 252,
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
                "activated": true,
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
        "name": "webnachrichten.de",
        "alias": "webnachrichten-de",
        "identifier": "https://www.webnachrichten.de",
        "googleNewsName": "webnachrichten.de",
        "artworkDirectory": "webnachrichten-de",
    },
    {
        "id": 290,
        "advert": {
            "adMarkerHeight": 20,
            "adDefendActivated": true,
            "traffective": {
                "dfpAdUrl": "/307308315,5176/idan.meine-anzeigenzeitung.de",
            },
        },
        "amp": {
            "activated": false,
        },
        "author": {
            "showAuthorLinks": true,
        },
        "comment": {
            "disqus": {
                "shortname": "id-meineanzeigenzeitung",
            },
        },
        "image": {
            "defaultContentImageRatio": "RATIO_5_9_RETAIN",
        },
        "widgets": {
            "inArticleReco": null,
            "cxo": null,
            "newsletter": {
                "activated": true,
                "campaignId": 73446245,
                "newsletterName": "daily",
                "options": null,
            },
            "glomex": null,
        },
        "seoStoryTicker": null,
        "paywall": null,
        "googleTagManager": null,
        "name": "meine-anzeigenzeitung.de",
        "alias": "meine-anzeigenzeitung",
        "identifier": "https://www.meine-anzeigenzeitung.de",
        "artworkDirectory": "meine-anzeigenzeitung",
    },
    {
        "id": 315,
        "advert": {
            "adMarkerHeight": 20,
            "adDefendActivated": true,
            "traffective": {
                "dfpAdUrl": "/307308315,5176/wetterauer-zeitung.de",
            },
        },
        "amp": {
            "activated": false,
        },
        "author": {
            "showAuthorLinks": true,
        },
        "comment": {
            "disqus": {
                "shortname": "id-wetterauer-zeitung",
            },
        },
        "image": {
            "defaultContentImageRatio": "DEFAULT",
        },
        "widgets": {
            "inArticleReco": {
                "activated": true,
            },
            "cxo": {
                "activated": false,
            },
            "newsletter": {
                "activated": true,
                "campaignId": 56785862,
                "newsletterName": null,
                "options": null,
            },
            "glomex": null,
        },
        "seoStoryTicker": null,
        "paywall": null,
        "googleTagManager": null,
        "name": "Wetterauer Zeitung",
        "alias": "wetterauer-zeitung",
        "identifier": "https://www.wetterauer-zeitung.de",
        "googleNewsName": "Wetterauer Zeitung",
        "artworkDirectory": "wetterauer-zeitung",
    },
    {
        "id": 249,
        "advert": {
            "adMarkerHeight": 20,
            "adDefendActivated": true,
            "traffective": {
                "dfpAdUrl": "/307308315,5176/rga.de",
            },
        },
        "amp": {
            "activated": false,
        },
        "author": {
            "showAuthorLinks": true,
        },
        "comment": {
            "disqus": {
                "shortname": "id-rga",
            },
        },
        "image": {
            "defaultContentImageRatio": "DEFAULT",
        },
        "widgets": {
            "inArticleReco": null,
            "cxo": null,
            "newsletter": {
                "activated": true,
                "campaignId": 54010717,
                "newsletterName": "",
                "options": null,
            },
            "glomex": null,
        },
        "seoStoryTicker": null,
        "paywall": {
            "activated": true,
            "storyElementsBeforePaywall": 8,
        },
        "googleTagManager": null,
        "name": "Remscheider General-Anzeiger",
        "alias": "rga",
        "identifier": "https://www.rga.de",
        "googleNewsName": "Remscheider General-Anzeiger",
        "artworkDirectory": "rga",
    },
];

test("checkbox components are not rendered at page load", () => {
    render(<Sidebar
        clientsList={mockedClientList}
        filteredClientsList={[]}
        dispatchFilteredClientsList={() => null} />);

    expect(screen.queryByTestId(241)).toBeFalsy();
});

test("checkbox components are rendered after select change", () => {
    render(<Sidebar
        clientsList={mockedClientList}
        filteredClientsList={[]}
        dispatchFilteredClientsList={() => null} />);

    fireEvent.mouseDown(screen.getByLabelText("ClientID / Name"));
    expect(screen.queryByTestId(241)).toBeInTheDocument();
});

test("checkbox are checked when their values are present in filteredClientsList", () => {
    const mockedFilteredList = [
        {
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
        },
    ];

    render(<Sidebar
        clientsList={mockedClientList}
        filteredClientsList={mockedFilteredList}
        dispatchFilteredClientsList={() => null} />);

    fireEvent.mouseDown(screen.getByLabelText("ClientID / Name"));
    expect(screen.queryByTestId(241)).toHaveClass("Mui-checked");
});
