import { act, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/system";
import IDModalSidebar from "components/detailPage/ModalSidebar";
import edidTheme from "../../themes/edid";
import { mockedFeatureDetailForClient } from "../mockData";

const setFeaturesDetailConfigSelected = jest.fn();

test("Configuration Box is rendered and toggle button is present", () => {
    act(() => {
        render(<ThemeProvider theme={edidTheme}>
            <IDModalSidebar
                featuresDetailConfig={mockedFeatureDetailForClient.configurations}
                featureKey="cleverpush"
                jsonSchema={{}}
                setFeaturesDetailConfigSelected={setFeaturesDetailConfigSelected}
            />
        </ThemeProvider>);
    });
    const configurationBox = screen.getAllByTestId("toggle")[0];
    const toggleButton = within(configurationBox).getByTestId("toggleButton");

    expect(toggleButton).toBeInTheDocument();
});

test("Configuration Box is not rendered if no configurations are passed", () => {
    act(() => {
        render(<ThemeProvider theme={edidTheme}>
            <IDModalSidebar
                featuresDetailConfig={[]}
                featureKey="cleverpush"
                jsonSchema={{}}
                setFeaturesDetailConfigSelected={setFeaturesDetailConfigSelected}
            />
        </ThemeProvider>);
    });
    const configurationBox = screen.queryByTestId("toggle");

    expect(configurationBox).not.toBeInTheDocument();
});
