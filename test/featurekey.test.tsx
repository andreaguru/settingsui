import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {mockedClientListWithHasFeatures, mockedFeatures} from "./mockData";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";
import {RouterContext} from "next/dist/shared/lib/router-context";
import {createMockRouter} from "./test-utils/createMockRouter";
import FeatureDetailPage from "../pages/feature/[clientId]/[featureId]";

jest.mock("../api/DashboardAPI");

const setFilteredValues = jest.fn();

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

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

test("modal window is rendered if the feature is present", () => {
    const {container} = render(
        <RouterContext.Provider
            value={createMockRouter({query: {"clientId": "241", "featurekey": "traffective"}})}>
            <FeatureDetailPage
                clients={mockedClientListWithHasFeatures}
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
    // test that client id is rendered in the page
    expect(screen.queryByTestId("241")).toBeInTheDocument();
    // test that loaders (Skeleton components) are not present in the document
    expect(container.getElementsByClassName("MuiSkeleton-root").length).toBe(0);
});
