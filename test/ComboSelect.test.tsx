import {fireEvent, render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import IDComboSelect from "../components/IDComboSelect";
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

test("checkbox components are not rendered at page load", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        filteredValues={[]}
        setFilteredValues={() => null} />);

    expect(screen.queryByTestId(241)).toBeFalsy();
});

test("placeholder is set and visible on rendered component", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        filteredValues={[]}
        setFilteredValues={() => null} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
});

test("checkbox components are rendered after select change", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        filteredValues={[]}
        setFilteredValues={() => null} />);

    // focus on autocomplete and type "abc" as sample text
    const autocomplete = screen.getByTestId("combobox");
    const input = within(autocomplete).getByRole("combobox");
    autocomplete.focus();
    fireEvent.change(input, {target: {value: "abc"}});

    expect(screen.queryByTestId(241)).toBeInTheDocument();
});

test("checkbox are checked when their values are present in filteredClients", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        filteredValues={mockedFilteredList}
        setFilteredValues={() => null} />);

    // focus on autocomplete and type "abc" as sample text
    const autocomplete = screen.getByTestId("combobox");
    const input = within(autocomplete).getByRole("combobox");
    autocomplete.focus();
    fireEvent.change(input, {target: {value: "abc"}});

    expect(screen.queryByTestId(241)).toHaveClass("Mui-checked");
});

/* Unit Tests */

