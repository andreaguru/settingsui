import {render, screen, within} from "@testing-library/react";
import "@testing-library/jest-dom";
import {mockedFeatureDetailForClient} from "./mockData";
import {ThemeProvider} from "@mui/system";
import {edidTheme} from "../themes/edid";
import IDModalSidebar from "../components/detailPage/IDModalSidebar";

const setFeaturesDetailConfigSelected = jest.fn();

test("Configuration Box is rendered and toggle button is present", () => {
    render(<ThemeProvider theme={edidTheme}><IDModalSidebar
        featuresDetailConfig={mockedFeatureDetailForClient.configurations}
        featureKey="cleverpush"
        jsonSchema={{}}
        setFeaturesDetailConfigSelected={setFeaturesDetailConfigSelected} /></ThemeProvider>);

    const configurationBox = screen.getAllByTestId("toggle")[0];
    const toggleButton = within(configurationBox).getByRole("button");

    expect(toggleButton).toBeInTheDocument();
});
