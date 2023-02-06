import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent, {getClientColorByStatus, getIconColorByStatus} from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {edidTheme} from "../themes/edid";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(<MainContent
        clientsList={mockedClientListWithHasFeatures}
        filteredClientsList={[]}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}/>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if filteredClientList is not empty", () => {
    render(<MainContent
        clientsList={mockedClientListWithHasFeatures}
        filteredClientsList={mockedFilteredList}
        filteredFeatures={[]}
        showSelectedFeatures={showSelectedFeatures}
        featureStatus={FeatSelectedStatus.ALL}/>);


    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
    expect(screen.queryByText(/Wetterauer Zeitung/i)).not.toBeInTheDocument();
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
    const colors = getClientColorByStatus("ENABLED", edidTheme, false);
    expect(colors).toBe("success");
});
