import {act, fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import IDToggle from "../components/IDToggle";
import {ThemeProvider} from "@mui/system";
import {edidTheme} from "../themes/edid";

jest.mock("../api/DashboardAPI");

test("Toggle has class disabled when disabled property is passed", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <IDToggle featureKey="footer" jsonSchema={{}} disabled/>
        </ThemeProvider>
    );
    // first check if the component has class disabled
    expect(screen.getByTestId("toggle").classList.contains("Mui-disabled")).toBe(true);
    // then check if the button inside the component is disabled
    expect(screen.getByRole("button")).toBeDisabled();
    // if the button inside the component is disabled, a click is not rendering the collapsed component
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("collapsedContent")).not.toBeInTheDocument();
});

test("Toggle is expanded at first click / Toggle collapses at second click", async () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <IDToggle featureKey="footer" jsonSchema={{}}/>
        </ThemeProvider>
    );
    await act(async () => {
        fireEvent.click(screen.getByRole("button"));
    });
    expect(screen.queryByTestId("collapsedContent")).toBeInTheDocument();

    await act(async () => {
        fireEvent.click(screen.getByRole("button"));
    });

    // Wait for another 300 milliseconds after click
    await new Promise((resolve) => setTimeout(resolve, 300));
    // test that client list returns an array with 4 values
    expect(screen.queryByTestId("collapsedContent")).not.toBeInTheDocument();
});

test("Toggle is collapsed at second click", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <IDToggle featureKey="footer" jsonSchema={{}}/>
        </ThemeProvider>
    );
    fireEvent.doubleClick(screen.getByRole("button"));
    // test that client list returns an array with 4 values
    expect(screen.queryByTestId("collapsedContent")).not.toBeInTheDocument();
});
