import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";
import {mockedClientListWithHasFeatures, mockedFeatures} from "./mockData";

jest.mock("../api/DashboardAPI");

const setFilteredValues = jest.fn();

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

test("client list is not present and loader is present if isLoading is true", () => {
    const {container} = render(<Home
        clients={mockedClientListWithHasFeatures}
        filteredClients={[]}
        filteredFeatures={[]}
        featureStatus={[]}
        setFilteredClients={setFilteredValues}
        setFilteredFeatures={setFilteredValues}
        showSelectedFeatures={showSelectedFeatures}
        setFeatureStatus={setFilteredValues}
        isLoading={true}
    />);
    // test that client list returns an empty array
    expect(screen.queryAllByTestId("client").length).toBe(0);
    // test that 4 loaders (Skeleton components) are present in the document
    expect(container.getElementsByClassName("MuiSkeleton-root").length).toBe(4);
});

test("client list is present and loader is not present if isLoading is false", () => {
    const {container} = render(<Home
        clients={mockedClientListWithHasFeatures}
        filteredClients={[]}
        filteredFeatures={[]}
        featureStatus={[]}
        setFilteredClients={setFilteredValues}
        setFilteredFeatures={setFilteredValues}
        showSelectedFeatures={showSelectedFeatures}
        setFeatureStatus={setFilteredValues}
        isLoading={false}
    />);
    // test that client list returns an array with 4 values
    expect(screen.queryAllByTestId("client").length).toBe(4);
    // test that loaders (Skeleton components) are not present in the document
    expect(container.getElementsByClassName("MuiSkeleton-root").length).toBe(0);
});
