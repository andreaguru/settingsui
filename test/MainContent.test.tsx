import {render, screen, within} from "@testing-library/react";
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

test("client color is dark gray when client feature is inactive", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);

    // get the first rendered ClientCard Component
    const clientCard = screen.getByTestId(mockedClientListWithHasFeatures[0].id);
    // inArticleReco -> feature client is DISABLED
    const disabledFeature = within(clientCard).getAllByText(/ECR In Article/)[0].parentElement as HTMLElement;
    expect(disabledFeature).toHaveStyle({
        "color": edidTheme.palette.neutral.main,
        "backgroundColor": edidTheme.palette.neutral.light});
});

test("category icon color is green when category feature is active", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);

    // get the first rendered ClientCard Component
    const clientCard = screen.getByTestId(mockedClientListWithHasFeatures[0].id);
    // traffective -> feature category is NONE, feature tag is DISABLED
    const traffective = within(clientCard).getAllByText(/Traffective Ads/)[0].parentElement as HTMLElement;
    // category icon - testid is automatically included by MUI
    const categoryIcon = within(traffective).getByTestId("AccountTreeIcon");
    // tag icon - testid is automatically included by MUI
    const tagIcon = within(traffective).getByTestId("LocalOfferIcon");

    // Test if feature category has grey color
    expect(categoryIcon).toHaveStyle({"color": edidTheme.palette.disabled.main});
    // Test if feature tag has green color
    expect(tagIcon).toHaveStyle({"color": edidTheme.palette.success.main});
});

// UNIT TESTS
