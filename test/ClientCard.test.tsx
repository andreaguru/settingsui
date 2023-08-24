import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import {RouterContext} from "next/dist/shared/lib/router-context";
import {createMockRouter} from "./test-utils/createMockRouter";
import ClientCard, {getButtonColorByStatus, getIconColorByStatus} from "../components/ClientCard";
import {mockedClientListWithHasFeatures, mockedFeatures} from "./mockData";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";
import * as reactObserver from "react-intersection-observer";
import {InViewHookResponse} from "react-intersection-observer";

jest.mock("react-intersection-observer");

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

beforeEach( () => {
    // Define the return value of the mock
    const inViewMockResponse: InViewHookResponse = [
        jest.fn(),
        true,
        undefined, // An optional parameter with no value
    ] as unknown as InViewHookResponse;

    jest.spyOn(reactObserver, "useInView").mockReturnValue(inViewMockResponse);
});

describe("Parameterized test for ClientCard", () => {
    const clientData = [
        {
            id: 321,
            name: "Merkur",
            features: [],
        },
        {
            id: 234,
            name: "TZ",
            features: [],
        },
        {
            id: 145,
            name: "Kreiszeitung",
            features: [],
        },
    ];

    test.each(clientData)(
        "Client name and ID are outputted in the DOM",
        (clientValue) => {
            render(<ThemeProvider theme={edidTheme}>
                <ClientCard
                    client={clientValue}
                    showSelectedFeatures={() => []}/>
            </ThemeProvider>);

            expect(screen.getByText(clientValue.name)).toBeInTheDocument();
            expect(screen.getByText(clientValue.id)).toBeInTheDocument();
        }
    );

    test.each(mockedClientListWithHasFeatures)(
        "Client name and ID are outputted in the DOM",
        (clientMocked) => {
            render(
                <ThemeProvider theme={edidTheme}>
                    <ClientCard
                        client={clientMocked}
                        showSelectedFeatures={showSelectedFeatures}/>);
                </ThemeProvider>);


            const autocomplete = screen.getByTestId(clientMocked.id);
            // traffective -> feature client is ENABLED
            const traffective = within(autocomplete)
                .getByText(clientMocked.features[0].name).parentElement as HTMLElement;
            // inArticleReco -> feature client is DISABLED
            const inArticleReco = within(autocomplete)
                .getByText(clientMocked.features[1].name).parentElement as HTMLElement;

            expect(traffective).toHaveStyle({
                "color": edidTheme.palette.success.main,
                "backgroundColor": edidTheme.palette.success.light});

            expect(inArticleReco).toHaveStyle({
                "color": edidTheme.palette.neutral.main,
                "backgroundColor": edidTheme.palette.neutral.light});
        }
    );

    test.each(mockedClientListWithHasFeatures)(
        "fltr-clients query param is appended to href attr in Next Link Component",
        (clientMocked) => {
            render(
                <RouterContext.Provider value={createMockRouter({query: {"fltr-clients": clientMocked.id.toString()}})}>
                    <ThemeProvider theme={edidTheme}>
                        <ClientCard
                            client={clientMocked}
                            showSelectedFeatures={showSelectedFeatures}/>
                    </ThemeProvider>;
                </RouterContext.Provider>
            );

            const autocomplete = screen.getByTestId(clientMocked.id);
            // get first mocked feature -> traffective
            const traffective = within(autocomplete)
                .getByText(clientMocked.features[0].name).parentElement as HTMLElement;
            expect(traffective).toHaveAttribute(
                "href",
                // eslint-disable-next-line max-len
                `/feature/${clientMocked.id}/${clientMocked.features[0].technicalName}?fltr-clients=${clientMocked.id}`
            );
        }
    );
});

test("component shows no features if showSelectedFeatures returns and empty array", () => {
    render(<ThemeProvider theme={edidTheme}>
        <ClientCard
            client={{
                id: 1,
                name: "Test",
                features: [],
            }}
            showSelectedFeatures={() => []}/>
    </ThemeProvider>);

    expect(screen.queryAllByTestId("feature").length).toBe(0);
});

test("component shows features if showSelectedFeatures returns an array with values", () => {
    render(<ThemeProvider theme={edidTheme}>
        <ClientCard
            client={mockedClientListWithHasFeatures[0]}
            showSelectedFeatures={showSelectedFeatures}/>);
    </ThemeProvider>);

    // mockedFeatures contains 3 Features, we expect to have them in the DOM
    expect(screen.queryAllByTestId("feature").length).toBe(3);
});

// UNIT TESTS
test("returns success if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe("success");
});

test("returns warning if status is enabled_and_disabled", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("warning");
});

test("returns success color if feature status is enabled", () => {
    const color = getButtonColorByStatus("ENABLED", edidTheme).color;
    expect(color).toBe(edidTheme.palette.success.main);
});

test("returns success background color if feature status is enabled", () => {
    const color = getButtonColorByStatus("ENABLED", edidTheme).bgColor;
    expect(color).toBe(edidTheme.palette.success.light);
});
