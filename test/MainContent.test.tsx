import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent, {getFeatureColorByStatus} from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";

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
test("getFeatureColorByStatus returns success if feature status is enabled", () => {
    const colors = getFeatureColorByStatus("ENABLED");
    expect(colors).toBe("success");
});

test("getFeatureColorByStatus returns success if feature status is enabled_and_disabled and feature filter is set to active", () => {
    const colors = getFeatureColorByStatus("ENABLED_AND_DISABLED", FeatSelectedStatus.ACTIVE);
    expect(colors).toBe("success");
});

test("getFeatureColorByStatus returns error if feature status is enabled_and_disabled and feature filter is set to inactive", () => {
    const colors = getFeatureColorByStatus("ENABLED_AND_DISABLED", FeatSelectedStatus.INACTIVE);
    expect(colors).toBe("error");
});
