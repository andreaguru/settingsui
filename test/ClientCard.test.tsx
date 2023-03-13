import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientCard, {getButtonColorByStatus, getIconColorByStatus} from "../components/ClientCard";
import {mockedClientListWithHasFeatures, mockedFeatures} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";
import MainContent from "../components/MainContent";
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
    render(<ThemeProvider theme={edidTheme}>
        <ClientCard
            client={{}}
            filteredFeatures={[]}
            showSelectedFeatures={showSelectedFeatures}
            featureStatus={FeatSelectedStatus.ALL}/>
    </ThemeProvider>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<ThemeProvider theme={edidTheme}>
        <ClientCard
            client={mockedClientListWithHasFeatures[0]}
            filteredFeatures={[]}
            showSelectedFeatures={showSelectedFeatures}
            featureStatus={FeatSelectedStatus.ALL}/>);
    </ThemeProvider>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
});

test("client color is green when client feature is active", () => {
    render(<ThemeProvider theme={edidTheme}>
        <ClientCard
            client={mockedClientListWithHasFeatures[0]}
            filteredFeatures={[]}
            showSelectedFeatures={showSelectedFeatures}
            featureStatus={FeatSelectedStatus.ALL}/>);
    </ThemeProvider>);


    // traffective -> feature client is ENABLED
    const autocomplete = screen.getByTestId("241");
    const traffective = within(autocomplete).getByText(/traffective/).parentElement as HTMLElement;
    expect(traffective).toHaveStyle({
        "color": edidTheme.palette.success.main,
        "backgroundColor": edidTheme.palette.success.light});
});

test("client color is dark gray when client feature is inactive", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                filteredFeatures={[]}
                showSelectedFeatures={showSelectedFeatures}
                featureStatus={FeatSelectedStatus.ALL}
                isLoading={false}/>
        </ThemeProvider>);


    // inArticleReco -> feature client is DISABLED
    const autocomplete = screen.getByTestId("241");
    const traffective = within(autocomplete).getByText(/inArticleReco/).parentElement as HTMLElement;
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
                filteredFeatures={[]}
                showSelectedFeatures={showSelectedFeatures}
                featureStatus={FeatSelectedStatus.ALL}
                isLoading={false}/>
        </ThemeProvider>);


    // traffective -> feature category is NONE, feature tag is DISABLED
    const autocomplete = screen.getByTestId("241");
    const traffective = within(autocomplete).getByText(/traffective/).parentElement as HTMLElement;
    // category icon
    const categoryIcon = within(traffective).getByTestId("AccountTreeIcon");
    // tag icon
    const tagIcon = within(traffective).getByTestId("LocalOfferIcon");

    // Test if feature category has grey color
    expect(categoryIcon).toHaveStyle({"color": edidTheme.palette.disabled.main});
    // Test if feature tag has red color
    expect(tagIcon).toHaveStyle({"color": edidTheme.palette.error.main});
});

// UNIT TESTS
test("returns success if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe("success");
});

test("returns warning if status is enabled_and_disabled", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("warning");
});

test("returns success color if feature status is enabled", () => {
    const color = getButtonColorByStatus("ENABLED", edidTheme).color;
    expect(color).toBe(edidTheme.palette.success.main);
});

test("returns success background color if feature status is enabled", () => {
    const color = getButtonColorByStatus("ENABLED", edidTheme).bgColor;
    expect(color).toBe(edidTheme.palette.success.light);
});
