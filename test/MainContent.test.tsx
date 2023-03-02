import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent, {getClientColorByStatus, getIconColorByStatus} from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<ThemeProvider theme={edidTheme}><MainContent
        clientsList={[]}
        filteredClientsList={[]}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}
        isLoading={false}/></ThemeProvider>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<ThemeProvider theme={edidTheme}><MainContent
        clientsList={mockedClientListWithHasFeatures}
        filteredClientsList={[]}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}
        isLoading={false}/></ThemeProvider>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if filteredClientList is not empty", () => {
    render(<ThemeProvider theme={edidTheme}><MainContent
        clientsList={mockedClientListWithHasFeatures}
        filteredClientsList={mockedFilteredList}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}
        isLoading={false}/></ThemeProvider>);


    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
    expect(screen.queryByText(/Wetterauer Zeitung/i)).not.toBeInTheDocument();
});

// UNIT TESTS
test("returns success if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe("success");
});

test("returns success if feature status is enabled", () => {
    const colors = getClientColorByStatus("ENABLED", edidTheme, false);
    expect(colors).toBe("#319E7D");
});

test("returns success if feature status is disabled", () => {
    const colors = getClientColorByStatus("DISABLED", edidTheme, false);
    expect(colors).toBe("#616161");
});
