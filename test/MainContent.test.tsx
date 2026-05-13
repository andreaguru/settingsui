import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "components/MainContent";
import { ThemeProvider } from "@mui/material/styles";
import { AppContext } from "context/AppContext";
import edidTheme from "../themes/edid";
import { mockedClientList, mockedFeatures, mockedFilteredList } from "./mockData";

jest.mock("react-intersection-observer", () => ({
    useInView: () => [() => null, true], // Second value in array will be treated as 'inView
}));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

describe("MainContent", () => {
    test("component contains no CliendCard if clientList and filteredClientList are empty", () => {
        const { container } = render(<AppContext
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
                clients: [],
                setClients: () => {
                    // This function is a placeholder for the test
                },
                featureList: [],
                showSelectedFeatures: () => [],
                clientsLoading: false,
                userData: {},
                setUserData: () => {
                    // This function is a placeholder for the test
                },
            }}
        >
            <MainContent />
        </AppContext>);

        expect(container.getElementsByClassName("MuiCard-root").length).toBe(0);
    });

    test("component shows CliendCards if it is passed in the props", () => {
        const { container } = render(<ThemeProvider theme={edidTheme}>
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
                    featureList: [],
                    showSelectedFeatures,
                    clientsLoading: false,
                    userData: {},
                    setUserData: () => {
                        // This function is a placeholder for the test
                    },
                }}
            >
                <MainContent />
            </AppContext>
        </ThemeProvider>);

        expect(container.getElementsByClassName("MuiCard-root").length).toBeGreaterThan(0);
    });

    test("component shows filteredClientList instead of clientList" +
        "if filteredClientList is not empty", () => {
        act(() => {
            render(<ThemeProvider theme={edidTheme}>
                <AppContext
                    value={{
                        filteredClients: mockedFilteredList,
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
                        featureList: [],
                        showSelectedFeatures,
                        clientsLoading: false,
                        userData: {},
                        setUserData: () => {
                            // This function is a placeholder for the test
                        },
                    }}
                >
                    <MainContent />
                </AppContext>
            </ThemeProvider>);
        });

        // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
        expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
        expect(screen.queryByText(/Wetterauer Zeitung/i)).not.toBeInTheDocument();
    });
});

// UNIT TESTS
