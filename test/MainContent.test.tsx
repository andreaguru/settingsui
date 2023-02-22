import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent, {getButtonColorByStatus, getIconColorByStatus} from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}
        isLoading={false}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<MainContent
        clientsList={mockedClientListWithHasFeatures}
        filteredClientsList={[]}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}
        isLoading={false}/>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if filteredClientList is not empty", () => {
    render(<MainContent
        clientsList={mockedClientListWithHasFeatures}
        filteredClientsList={mockedFilteredList}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}
        isLoading={false}/>);


    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
    expect(screen.queryByText(/Wetterauer Zeitung/i)).not.toBeInTheDocument();
});

test("client color is green when client feature is active", () => {
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

test("returns success if status is enabled_and_disabled and feature filter is set to active", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("success");
});

test("returns error if status is enabled_and_disabled and feature filter is set to inactive", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("error");
});

test("returns success if feature status is enabled", () => {
    const colors = getButtonColorByStatus("ENABLED", edidTheme, false);
    expect(colors).toBe("success");
});
