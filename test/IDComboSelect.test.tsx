import {fireEvent, render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import IDComboSelect from "../components/IDComboSelect";
import {Clients} from "../types/api.types";

// TODO: Is it clearer to write Array<Client> ?
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
const setFilteredValues = jest.fn();

test("checkbox components are not rendered at page load", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        setFilteredValues={() => null} />);

    expect(screen.queryByTestId(241)).toBeFalsy();
});

test("placeholder is set and visible on rendered component", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        setFilteredValues={() => null} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
});

test("checkbox components are rendered after select change", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        setFilteredValues={() => null} />);

    // focus on autocomplete and type "abc" as sample text
    const autocomplete = screen.getByTestId("combobox");
    const input = within(autocomplete).getByRole("combobox");
    autocomplete.focus();
    fireEvent.change(input, {target: {value: "abc"}});

    expect(screen.queryByTestId(241)).toBeInTheDocument();
});

test("handleChange behavior - setFilteredValues is called when a combobox option is clicked", () => {
    render(<IDComboSelect
        values={mockedClientList}
        placeholder="Test"
        setFilteredValues={setFilteredValues} />);

    // focus on autocomplete and type "BlickPunkt" as text in order to retrieve the mocked value
    const autocomplete = screen.getByTestId("combobox");
    const input = within(autocomplete).getByRole("combobox");
    autocomplete.focus();
    fireEvent.change(input, {target: {value: "BlickPunkt"}});
    fireEvent.click(screen.getByText("BlickPunkt Nienburg"));

    expect(setFilteredValues).toHaveBeenCalled();
});

/* Unit Tests */
