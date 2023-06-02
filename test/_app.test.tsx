import "@testing-library/jest-dom";
import MyApp, {showFeaturesPerStatus} from "../pages/_app";
import {mockedClientListWithHasFeatures, mockedFeatures} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {render, screen, waitFor} from "@testing-library/react";
import {RouterContext} from "next/dist/shared/lib/router-context";
import {createMockRouter} from "./test-utils/createMockRouter";
import {Router} from "next/router";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";
import {act} from "react-dom/test-utils";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

jest.mock("../api/DashboardAPI", () => ({
    getClientList: jest.fn(() => Promise.resolve(mockedClientListWithHasFeatures)),
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

const mockRouter: Partial<Router> = {
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    basePath: "",
    push: jest.fn().mockResolvedValue(true),
    replace: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
};

test("filteredClients state is passed as prop if a filter is present in query param", async () => {
    const MockChildComponent = jest.fn(({filteredClients}) => (
        <div>{filteredClients.length ? filteredClients[0].name : ""}</div>)
    );

    await act( async () => {
        render(
            <RouterContext.Provider value={createMockRouter({query: {"fltr-clients": "Wetterauer Zeitung"}})}>
                <MyApp Component={MockChildComponent} pageProps={{}} router={mockRouter as Router} />
            </RouterContext.Provider>);
    });
    // test that client list returns an array with 4 values
    await waitFor(() => {
        expect(screen.getByText("Wetterauer Zeitung")).toBeInTheDocument();
    });
});

/* UNIT TESTS */
test("showFeaturesPerStatus returns the only Feature that is enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ACTIVE);
    expect(features[0].name).toBe("traffective");
});

test("showFeaturesPerStatus returns the two Features that are not enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.INACTIVE);
    expect(features[0].name).toBe("inArticleReco");
});

test("showFeaturesPerStatus returns all the features (no features removed)", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ALL);
    expect(features[0].name).toBe("traffective");
    expect(features[1].name).toBe("inArticleReco");
    expect(features[2].name).toBe("cleverPush");
});
