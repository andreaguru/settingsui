import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import * as apiMethods from "../api/DashboardAPI";
import Home from "../pages";
import {mockedClientListWithHasFeatures} from "./mockData";
import {showSelectedFeatures} from "../pages/_app";

jest.mock("../api/DashboardAPI");

const setFilteredValues = jest.fn();

beforeAll(async () => {
    const promise = Promise.resolve([]);
    jest.spyOn(apiMethods, "getClientList").mockReturnValue(promise);
});

test("renders the home page with all the static elements", () => {
    render(<Home
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
    expect(screen.getByRole("img")).toBeInTheDocument();
});
