import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";

jest.mock("react-intersection-observer");

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

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}
        showSelectedFeatures={showSelectedFeatures}
        isLoading={false}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
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


    // inArticleReco -> feature client is DISABLED
    const autocomplete = screen.getByTestId("241");
    const traffective = within(autocomplete).getByText(/ECR In Article/).parentElement as HTMLElement;
    expect(traffective).toHaveStyle({
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


    // traffective -> feature category is NONE, feature tag is DISABLED
    const autocomplete = screen.getByTestId("241");
    const traffective = within(autocomplete).getByText(/Traffective Ads/).parentElement as HTMLElement;
    // category icon
    const categoryIcon = within(traffective).getByTestId("AccountTreeIcon");
    // tag icon
    const tagIcon = within(traffective).getByTestId("LocalOfferIcon");

    // Test if feature category has grey color
    expect(categoryIcon).toHaveStyle({"color": edidTheme.palette.disabled.main});
    // Test if feature tag has green color
    expect(tagIcon).toHaveStyle({"color": edidTheme.palette.success.main});
});

// UNIT TESTS
