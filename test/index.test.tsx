import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import * as apiMethods from "../api/DashboardAPI";

jest.mock("../api/DashboardAPI");

beforeAll(async () => {
    const promise = Promise.resolve();
    jest.spyOn(apiMethods, "getIntegratedClientList").mockReturnValue(promise);
    jest.spyOn(apiMethods, "getFeaturesList").mockReturnValue(promise);
});

test("renders the home page with all the static elements", () => {
    render(<Home/>);
    expect(screen.getByRole("img")).toBeInTheDocument();
});

// TODO: Add more tests here: showFeaturesPerStatus, showSelectedFeatures, ...
