import {act, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {mockedClientListWithHasFeatures, mockedFeatureDetailForClient, mockedFeatures} from "./mockData";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";
import {RouterContext} from "next/dist/shared/lib/router-context";
import {createMockRouter} from "./test-utils/createMockRouter";
import FeatureDetailPage from "../pages/feature/[clientId]/[featurekey]";

jest.mock("../api/DashboardAPI");

jest.mock("../api/FeatureDetailAPI", () => ({
    getFeatureDetailForClient: jest.fn(() => Promise.resolve(mockedFeatureDetailForClient)),
    getUsagesPerFeature: jest.fn(() => Promise.resolve()),
}));

const setFilteredValues = jest.fn();

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

jest.mock("react-intersection-observer");
let renderedContainer: HTMLElement;

beforeEach( () => {
    // Define the return value of the mock
    const inViewMockResponse: InViewHookResponse = [
        jest.fn(),
        true,
        undefined, // An optional parameter with no value
    ] as unknown as InViewHookResponse;

    jest.spyOn(reactObserver, "useInView").mockReturnValue(inViewMockResponse);
});

test("modal window is rendered if the feature is present", async () => {
    await act(async () => {
        const {container} = render(
            <RouterContext.Provider
                value={createMockRouter({query: {"clientId": "241", "featurekey": "traffective"}})}>
                <FeatureDetailPage
                    clients={mockedClientListWithHasFeatures}
                    featureList={mockedFeatures}
                    filteredClients={[]}
                    filteredFeatures={[]}
                    featureStatus={[]}
                    setFilteredClients={setFilteredValues}
                    setFilteredFeatures={setFilteredValues}
                    showSelectedFeatures={showSelectedFeatures}
                    setFeatureStatus={setFilteredValues}
                    isLoading={false}
                />
            </RouterContext.Provider>);
        renderedContainer = container;
    });
    // test that client id is rendered in the page
    expect(screen.queryByTestId("241")).toBeInTheDocument();
    // test that loaders (Skeleton components) are not present in the document
    expect(renderedContainer.getElementsByClassName("MuiSkeleton-root").length).toBe(0);
});

test("Modal Sidebar is rendered if Feature Detail per Client is present", async () => {
    await act(async () => {
        render(<RouterContext.Provider
            value={createMockRouter({query: {"clientId": "241", "featurekey": "cleverpush"}})}>
            <FeatureDetailPage
                clients={mockedClientListWithHasFeatures}
                featureList={mockedFeatures}
                filteredClients={[]}
                filteredFeatures={[]}
                featureStatus={[]}
                setFilteredClients={setFilteredValues}
                setFilteredFeatures={setFilteredValues}
                showSelectedFeatures={showSelectedFeatures}
                setFeatureStatus={setFilteredValues}
                isLoading={false}
            />
        </RouterContext.Provider>);
    });

    expect(screen.queryByTestId("modalSidebar")).toBeInTheDocument();
});
