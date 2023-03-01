import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home, {showFeaturesPerStatus, showSelectedFeatures} from "../pages";
import * as apiMethods from "../api/DashboardAPI";
import {mockedFeatures, mockedFilteredFeatures} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";

jest.mock("../api/DashboardAPI");

beforeAll(async () => {
    const promise = Promise.resolve([]);
    jest.spyOn(apiMethods, "getClientList").mockReturnValue(promise);
});

test("renders the home page with all the static elements", () => {
    render(<Home/>);
    expect(screen.getByRole("img")).toBeInTheDocument();
});

/* UNIT TESTS */
test("showFeaturesPerStatus returns the only Feature that is enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ACTIVE);
    expect(features[0].name).toBe("cleverPush");
});

test("showFeaturesPerStatus returns the two Features that are not enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.INACTIVE);
    expect(features[0].name).toBe("traffective");
    expect(features[1].name).toBe("inArticleReco");
});

test("showFeaturesPerStatus returns all the features (no features removed)", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ALL);
    expect(features[0].name).toBe("traffective");
    expect(features[1].name).toBe("inArticleReco");
    expect(features[2].name).toBe("cleverPush");
});

test("showSelectedFeatures returns the inactive features that have is also present in mockedFilteredFeatures", () => {
    const features = showSelectedFeatures(mockedFeatures, FeatSelectedStatus.INACTIVE, mockedFilteredFeatures);
    expect(features[0].name).toBe("traffective");
});

test("showSelectedFeatures returns the features that are also present in mockedFilteredFeatures", () => {
    const features = showSelectedFeatures(mockedFeatures, FeatSelectedStatus.ALL, mockedFilteredFeatures);
    expect(features[0].name).toBe("traffective");
    expect(features[1].name).toBe("inArticleReco");
});
