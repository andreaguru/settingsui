import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";

jest.mock("react-intersection-observer");
jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

beforeEach( () => {
    // Define the return value of the mock
    const inViewMockResponse: InViewHookResponse = [
        jest.fn(),
        true,
        undefined, // An optional parameter with no value
    ] as unknown as InViewHookResponse;

    jest.spyOn(reactObserver, "useInView").mockReturnValue(inViewMockResponse);
});

test("component contains no CliendCard if clientList and filteredClientList are empty", () => {
    const {container} = render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}
        showSelectedFeatures={showSelectedFeatures}
        isLoading={false}/>);

    expect(container.getElementsByClassName("MuiCard-root").length).toBe(0);
});

test("component shows CliendCards if it is passed in the props", () => {
    const {container} = render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);

    expect(container.getElementsByClassName("MuiCard-root").length).toBeGreaterThan(0);
});

test("component shows filteredClientList instead of clientList if filteredClientList is not empty", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={mockedFilteredList}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);


    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
    expect(screen.queryByText(/Wetterauer Zeitung/i)).not.toBeInTheDocument();
});

// UNIT TESTS
