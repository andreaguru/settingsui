import "@testing-library/jest-dom";
import MyApp, {showFeaturesPerStatus} from "../pages/_app";
import {mockedClientListWithHasFeatures, mockedFeatures} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {render, screen, waitFor} from "@testing-library/react";
import {RouterContext} from "next/dist/shared/lib/router-context.shared-runtime";
import {createMockRouter} from "./test-utils/createMockRouter";
import {Router} from "next/router";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";
import {act} from "react-dom/test-utils";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

jest.mock("../api/DashboardAPI", () => ({
    getClientList: jest.fn(() => Promise.resolve(mockedClientListWithHasFeatures)),
    getFeaturesPerClient: jest.fn(() => Promise.resolve(mockedFeatures)),
    getFeaturesListPromise: jest.fn(() => Promise.resolve(mockedFeatures)),
}));

jest.mock("react-intersection-observer");

beforeEach( () => {
    // Define the return value of the mock
    const inViewMockResponse: InViewHookResponse = [
        jest.fn(),
        true,
        undefined, // An optional parameter with no value
    ] as unknown as InViewHookResponse;

    jest.spyOn(reactObserver, "useInView").mockReturnValue(inViewMockResponse);
});

test("filteredClients state is passed as prop if a filter is present in query param", async () => {
    const MockChildComponent = jest.fn(({filteredClients}) => (
        <div>{filteredClients.length ? filteredClients[0].name : ""}</div>)
    );

    await act( async () => {
        render(
            <RouterContext.Provider value={createMockRouter({query: {"fltr-clients": "315"}})}>
                <MyApp Component={MockChildComponent} pageProps={{}} router={createMockRouter({}) as Router} />
            </RouterContext.Provider>);
    });
    await waitFor(() => {
        // 315 is the id of client Wetterauer Zeitung
        expect(screen.getByText("Wetterauer Zeitung")).toBeInTheDocument();
    });
});

/* UNIT TESTS */
test("showFeaturesPerStatus returns the only Feature that is enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ACTIVE);
    expect(features[0].key).toBe("traffective");
});

test("showFeaturesPerStatus returns the two Features that are not enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.INACTIVE);
    expect(features[0].key).toBe("inArticleReco");
});

test("showFeaturesPerStatus returns all the features (no features removed)", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ALL);
    expect(features[0].key).toBe("traffective");
    expect(features[1].key).toBe("inArticleReco");
    expect(features[2].key).toBe("cleverpush");
});
