import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import IDToggle from "../components/IDToggle";
import {ThemeProvider} from "@mui/system";
import {edidTheme} from "../themes/edid";

jest.mock("../api/DashboardAPI");

test("Toggle has class disabled when disabled property is passed", () => {
    const {container} = render(
        <ThemeProvider theme={edidTheme}>
            <IDToggle disabled />
        </ThemeProvider>
    );
    // test that client list returns an array with 4 values
    expect(container.getElementsByClassName("Mui-disabled").length).toBe(1);
});

test("Toggle is expanded at first click", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <IDToggle />
        </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button"));
    // test that client list returns an array with 4 values
    expect(screen.queryByTestId("collapsedContent")).toBeInTheDocument();
});

test("Toggle is collapsed at second click", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <IDToggle />
        </ThemeProvider>
    );
    fireEvent.doubleClick(screen.getByRole("button"));
    // test that client list returns an array with 4 values
    expect(screen.queryByTestId("collapsedContent")).not.toBeInTheDocument();
});
