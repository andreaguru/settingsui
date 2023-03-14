import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent, {getButtonColorByStatus, getIconColorByStatus} from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<ThemeProvider theme={edidTheme}>
        <MainContent
            clientsList={[]}
            filteredClientsList={[]}
            showSelectedFeatures={showSelectedFeatures}
            isLoading={false}/>
    </ThemeProvider>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<ThemeProvider theme={edidTheme}>
        <MainContent
            clientsList={mockedClientListWithHasFeatures}
            filteredClientsList={[]}
            showSelectedFeatures={showSelectedFeatures}
            isLoading={false}/>
    </ThemeProvider>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if filteredClientList is not empty", () => {
    render(<ThemeProvider theme={edidTheme}>
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

test("client color is green when client feature is active", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);


    // traffective -> feature client is ENABLED
    const autocomplete = screen.getAllByTestId("client")[0];
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
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);


    // inArticleReco -> feature client is DISABLED
    const autocomplete = screen.getAllByTestId("client")[0];
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
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);


    // traffective -> feature category is NONE, feature tag is ENABLED
    const autocomplete = screen.getAllByTestId("client")[0];
    const traffective = within(autocomplete).getByText(/traffective/).parentElement as HTMLElement;
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
test("returns success if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe("success");
});

test("returns warning if status is enabled_and_disabled", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("warning");
});

test("returns success main color if feature status is enabled", () => {
    const colors = getButtonColorByStatus("ENABLED", edidTheme).color;
    expect(colors).toBe(edidTheme.palette.success.main);
});

test("returns success if feature status is enabled", () => {
    const colors = getButtonColorByStatus("ENABLED", edidTheme).bgColor;
    expect(colors).toBe(edidTheme.palette.success.light);
});
