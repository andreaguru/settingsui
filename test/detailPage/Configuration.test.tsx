import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Configuration from "components/detailPage/Configuration";
import { ThemeProvider } from "@mui/system";
import FeatureDetailContext from "context/FeatureDetailContext";
import { TableView } from "types/api.types";
import edidTheme from "../../themes/edid";

jest.mock("services/DashboardAPI");

const config = {
    created: "",
    modified: "",
    name: "",
    id: 0,
    clientId: 0,
    settings: {},
};

const toggleConfig = jest.fn();

test("Toggle has class disabled when disabled property is passed", () => {
    render(<ThemeProvider theme={edidTheme}>
        <Configuration
            featureKey="footer"
            jsonSchema={null}
            disabled
            toggleConfig={toggleConfig}
            setShowConfigRemovedAlert={() => { /* empty */ }} />
    </ThemeProvider>);
    // first check if the component has class disabled
    expect(screen.getByTestId("toggle").classList.contains("Mui-disabled")).toBe(true);
});

test("Toggle is expanded if config id is present in configExpanded array", async() => {
    render(<ThemeProvider theme={edidTheme}>
        <FeatureDetailContext
            value={{
                activeTab: { index: 0, name: TableView.CLIENT },
                setActiveTab: () => {
                    // This function is a placeholder for the test
                },
                configExpanded: [0],
                handleFeatureUpdate: () => {
                    // This function is a placeholder for the test
                },
                handleUsageUpdate: () => {
                    // This function is a placeholder for the test
                },
                dispatchConfigExpanded: jest.fn(),
            }}
        >
            <Configuration
                featureKey="footer"
                jsonSchema={{}}
                toggleConfig={toggleConfig}
                config={config}
                setShowConfigRemovedAlert={() => { /* empty */ }}
            />
        </FeatureDetailContext>
    </ThemeProvider>);

    fireEvent.click(screen.getByTestId("toggleButton"));

    await waitFor(() => {
        expect(screen.queryByTestId("collapsedContent")).toBeInTheDocument();
    });
});

test("Toggle is collapsed if config id is not present in configExpanded array", async() => {
    render(<ThemeProvider theme={edidTheme}>
        <FeatureDetailContext
            value={{
                activeTab: { index: 0, name: TableView.CLIENT },
                setActiveTab: () => {
                    // This function is a placeholder for the test
                },
                configExpanded: [],
                handleFeatureUpdate: () => {
                    // This function is a placeholder for the test
                },
                handleUsageUpdate: () => {
                    // This function is a placeholder for the test
                },
                dispatchConfigExpanded: jest.fn(),
            }}
        >
            <Configuration
                featureKey="footer"
                jsonSchema={{}}
                toggleConfig={toggleConfig}
                config={config}
                setShowConfigRemovedAlert={() => { /* empty */ }}
            />
        </FeatureDetailContext>
    </ThemeProvider>);

    fireEvent.click(screen.getByTestId("toggleButton"));

    // test that client list returns an array with 4 values
    await waitFor(() => {
        expect(screen.queryByTestId("collapsedContent")).not.toBeInTheDocument();
    });
});

test("changes editMode on click on Edit icon", async() => {
    render(<ThemeProvider theme={edidTheme}>
        <FeatureDetailContext
            value={{
                activeTab: { index: 0, name: TableView.CLIENT },
                setActiveTab: () => {
                    // This function is a placeholder for the test
                },
                configExpanded: [0],
                handleFeatureUpdate: () => {
                    // This function is a placeholder for the test
                },
                handleUsageUpdate: () => {
                    // This function is a placeholder for the test
                },
                dispatchConfigExpanded: jest.fn(),
            }}
        >
            <Configuration
                featureKey="footer"
                jsonSchema={{}}
                toggleConfig={toggleConfig}
                config={config}
                setShowConfigRemovedAlert={() => { /* empty */ }}
            />
        </FeatureDetailContext>
    </ThemeProvider>);
    const editButton = screen.getByTestId("editConfig");
    expect(screen.queryByText(/Speichern/i)).not.toBeInTheDocument();
    fireEvent.click(editButton);

    await waitFor(() => {
        expect(screen.queryByText(/Speichern/i)).toBeInTheDocument();
    });
});

test("modal window is shown on click on reset button", async() => {
    render(<ThemeProvider theme={edidTheme}>
        <FeatureDetailContext
            value={{
                activeTab: { index: 0, name: TableView.CLIENT },
                setActiveTab: () => {
                    // This function is a placeholder for the test
                },
                configExpanded: [0],
                handleFeatureUpdate: () => {
                    // This function is a placeholder for the test
                },
                handleUsageUpdate: () => {
                    // This function is a placeholder for the test
                },
                dispatchConfigExpanded: jest.fn(),
            }}
        >
            <Configuration
                featureKey="footer"
                jsonSchema={{}}
                toggleConfig={toggleConfig}
                config={config}
                setShowConfigRemovedAlert={() => { /* empty */ }}
            />
        </FeatureDetailContext>
    </ThemeProvider>);
    const editButton = screen.getByTestId("editConfig");
    fireEvent.click(editButton);

    const resetButton = screen.getByTestId("resetForm");
    fireEvent.click(resetButton);

    await waitFor(() => {
        expect(screen.queryByText(/Möchten Sie Ihre Änderungen wirklich zurücksetzen/i))
            .toBeInTheDocument();
    });
});
