import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import mockRouter from "next-router-mock";
import ClientCard, { getButtonColorByStatus } from "components/ClientCard";
import { ThemeProvider } from "@mui/material/styles";
import { AppContext } from "context/AppContext";
import edidTheme from "../themes/edid";
import { mockedClientList, mockedFeatures } from "./mockData";
import logger from "../logger";

jest.mock("react-intersection-observer", () => ({
    useInView: () => [() => null, true], // Second value in array will be treated as 'inView
}));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

jest.mock("services/DashboardAPI", () => ({
    getClientList: jest.fn(() => Promise.resolve(mockedClientList)),
    useFeaturesPerClient: jest.fn(() => mockedFeatures),
}));

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

    test.each(clientData)("Client name and ID are outputted in the DOM", clientValue => {
        render(<ThemeProvider theme={edidTheme}>
            <AppContext
                value={{
                    setClientIdInView: () => {
                        // This function is a placeholder for the test
                    },
                    clients: mockedClientList,
                    filteredClients: [],
                    filteredFeatures: [],
                    setFilteredClients(): void {
                        // This function is a placeholder for the test
                    },
                    setFilteredFeatures(): void {
                        // This function is a placeholder for the test
                    },
                    setClients: () => {
                        // This function is a placeholder for the test
                    },
                    featureList: mockedFeatures,
                    showSelectedFeatures,
                    clientsLoading: true,
                    userData: {},
                    setUserData: () => {
                        // This function is a placeholder for the test
                    },
                }}
            >
                <ClientCard client={clientValue} />
            </AppContext>
        </ThemeProvider>);

        expect(screen.getByText(clientValue.name, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(String(clientValue.id), { exact: false })).toBeInTheDocument();
    });

    test.each(mockedClientList)("Feature button matches color status", clientMocked => {
        render(<ThemeProvider theme={edidTheme}>
            <AppContext
                value={{
                    filteredClients: [],
                    filteredFeatures: [],
                    setFilteredClients(): void {
                        // This function is a placeholder for the test
                    },
                    setFilteredFeatures(): void {
                        // This function is a placeholder for the test
                    },
                    setClientIdInView: () => {
                        // This function is a placeholder for the test
                    },
                    clients: mockedClientList,
                    setClients: () => {
                        // This function is a placeholder for the test
                    },
                    featureList: mockedFeatures,
                    showSelectedFeatures,
                    clientsLoading: true,
                    userData: {},
                    setUserData: () => {
                        // This function is a placeholder for the test
                    },
                }}
            >
                <ClientCard client={clientMocked} />
            </AppContext>
        </ThemeProvider>);

        const autocomplete = screen.getByTestId(String(clientMocked.id));
        // traffective -> feature client is ENABLED
        const traffective = within(autocomplete).getAllByText(mockedFeatures[0].name, {
            exact: false,
        })[0].parentElement!;
        // inArticleReco -> feature client is DISABLED
        const inArticleReco = within(autocomplete).getAllByText(mockedFeatures[1].name, {
            exact: false,
        })[0].parentElement!;

        expect(traffective).toHaveStyle({
            color: edidTheme.palette.id_green.main,
        });

        expect(inArticleReco).toHaveStyle({
            color: edidTheme.palette.id_mediumGray.main,
        });
    });

    test.each(mockedClientList)(
        "fltr-clients query param is appended to href attr in Next Link Component",
        clientMocked => {
            mockRouter.push({
                query: {
                    "fltr-clients": clientMocked.id.toString(),
                },
            })
                .catch(error => {
                    logger.error(error, "Failed to add filter in routing");
                });
            render(<RouterContext value={mockRouter}>
                <ThemeProvider theme={edidTheme}>
                    <AppContext
                        value={{
                            filteredClients: [],
                            filteredFeatures: [],
                            setFilteredClients(): void {
                                // This function is a placeholder for the test
                            },
                            setFilteredFeatures(): void {
                                // This function is a placeholder for the test
                            },
                            setClientIdInView: () => {
                                // This function is a placeholder for the test
                            },
                            clients: mockedClientList,
                            setClients: () => {
                                // This function is a placeholder for the test
                            },
                            featureList: mockedFeatures,
                            showSelectedFeatures,
                            clientsLoading: false,
                            userData: {},
                            setUserData: () => {
                                // This function is a placeholder for the test
                            },
                        }}
                    >
                        <ClientCard client={clientMocked} />
                    </AppContext>
                </ThemeProvider>
            </RouterContext>);

            const autocomplete = screen.getByTestId(String(clientMocked.id));
            // get first mocked feature -> traffective
            const traffective = within(autocomplete)
                .getAllByText(mockedFeatures[0].name)[0]
                .closest("a") as HTMLElement;
            expect(traffective).toHaveAttribute(
                "href",
                `/feature/${clientMocked.id}/${mockedFeatures[0].key}?fltr-clients=${clientMocked.id}`,
            );
        },
    );
});

test("component shows no features if showSelectedFeatures returns and empty array", () => {
    render(<ThemeProvider theme={edidTheme}>
        <AppContext
            value={{
                filteredClients: [],
                filteredFeatures: [],
                setFilteredClients(): void {
                    // This function is a placeholder for the test
                },
                setFilteredFeatures(): void {
                    // This function is a placeholder for the test
                },
                setClientIdInView: () => {
                    // This function is a placeholder for the test
                },
                clients: mockedClientList,
                setClients: () => {
                    // This function is a placeholder for the test
                },
                featureList: mockedFeatures,
                showSelectedFeatures: () => [],
                clientsLoading: true,
                userData: {},
                setUserData: () => {
                    // This function is a placeholder for the test
                },
            }}
        >
            <ClientCard
                client={{
                    id: 1,
                    name: "Test",
                }}
            />
        </AppContext>
    </ThemeProvider>);

    expect(screen.queryAllByTestId("feature").length).toBe(0);
});

test("component shows features if showSelectedFeatures returns an array with values", () => {
    const showSelectedUniversalFeatures = jest.fn();
    showSelectedUniversalFeatures.mockReturnValueOnce(mockedFeatures);

    render(<ThemeProvider theme={edidTheme}>
        <AppContext
            value={{
                filteredClients: [],
                filteredFeatures: [],
                setFilteredClients(): void {
                    // This function is a placeholder for the test
                },
                setFilteredFeatures(): void {
                    // This function is a placeholder for the test
                },
                setClientIdInView: () => {
                    // This function is a placeholder for the test
                },
                clients: mockedClientList,
                setClients: () => {
                    // This function is a placeholder for the test
                },
                featureList: mockedFeatures,
                showSelectedFeatures: showSelectedUniversalFeatures,
                clientsLoading: true,
                userData: {},
                setUserData: () => {
                    // This function is a placeholder for the test
                },
            }}
        >
            <ClientCard client={mockedClientList[0]} />
        </AppContext>
    </ThemeProvider>);

    // mockedFeatures contains 3 Features, we expect to have them in the DOM
    expect(screen.queryAllByTestId("feature").length).toBe(3);
});

// UNIT TESTS

test("returns id_green color if feature status is enabled", () => {
    const { color } = getButtonColorByStatus("ENABLED");
    expect(color).toBe(edidTheme.palette.id_green.main);
});

test("returns id_green background color if feature status is enabled", () => {
    const color = getButtonColorByStatus("ENABLED").bgColor;
    expect(color).toBe(edidTheme.palette.id_green.light);
});
