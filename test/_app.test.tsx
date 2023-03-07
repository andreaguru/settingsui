import "@testing-library/jest-dom";
import TemplatePage, {showFeaturesPerStatus} from "../pages/_app";
import * as apiMethods from "../api/DashboardAPI";
import {mockedClientList, mockedFeatures} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";
import {render, screen, waitFor} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import Home from "../pages";
import Router from "next/dist/shared/lib/router/router";

jest.mock("../api/DashboardAPI");

const mockRouter: Router = {
    pageLoader: undefined,
    _bps: undefined,
    _initialMatchesMiddlewarePromise: Promise.resolve(false),
    _key: undefined,
    _wrapApp() {
    },
    change: undefined,
    clc: null,
    isFirstPopStateEvent: false,
    isSsr: false,
    onPopState() {
    },
    set: undefined,
    state: undefined,
    sub() {
        return Promise.resolve(undefined);
    },
    _getData(): Promise<any> {
        return Promise.resolve(undefined);
    },
    _getFlightData(): Promise<any> {
        return Promise.resolve({data: ""});
    },
    changeState(): void {
    },
    fetchComponent(): Promise<any> {
        return Promise.resolve(undefined);
    },
    getInitialProps(): Promise<any> {
        return Promise.resolve(undefined);
    },
    getRouteInfo(): Promise<any> {
        return Promise.resolve(undefined);
    },
    handleRouteInfoError(): any {
        return Promise.resolve(undefined);
    },
    get locale(): string | undefined {
        return undefined;
    },
    onlyAHashChange(): boolean {
        return false;
    },
    scrollToHash(): void {
    },
    urlIsNew(): boolean {
        return false;
    },
    isLocaleDomain: false, get isPreview(): boolean {
        return false;
    }, isReady: false,
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
    isFallback: false,
    components: {},
};

beforeAll(async () => {
    const promise = Promise.resolve(mockedClientList);
    jest.spyOn(apiMethods, "getClientList").mockReturnValue(promise);
});

test("isLoading has been set to false and the clients are rendered", async () => {
    await act(async () => {
        render(<TemplatePage Component={Home} pageProps={{}} router={mockRouter} />);
    });
    await waitFor(() => {
        expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
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
