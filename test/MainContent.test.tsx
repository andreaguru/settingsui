import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "../components/MainContent";
import {mockedClientListWithHasFeatures, mockedFeatures, mockedFilteredList} from "./mockData";
import {edidTheme} from "../themes/edid";
import {ThemeProvider} from "@mui/material/styles";

const showSelectedFeatures = jest.fn();
showSelectedFeatures.mockReturnValue(mockedFeatures);

beforeEach( () => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

test("component is empty if empty clientList and empty filteredClientList is passed in the props", () => {
    render(<MainContent
        clientsList={[]}
        filteredClientsList={[]}
        showSelectedFeatures={showSelectedFeatures}
        isLoading={false}/>);

    expect(screen.queryByText("Wetterauer Zeitung")).not.toBeInTheDocument();
});

test("component shows clientList if it is passed in the props", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={[]}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);

    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
});

test("component shows filteredClientList instead of clientList if filteredClientList is not empty", () => {
    render(
        <ThemeProvider theme={edidTheme}>
            <MainContent
                clientsList={mockedClientListWithHasFeatures}
                filteredClientsList={mockedFilteredList}
                showSelectedFeatures={showSelectedFeatures}
                isLoading={false}/>
        </ThemeProvider>);


    // Wetterauer Zeitung is present in the clientList but not in the filteredClientList
    expect(screen.queryByText(/BlickPunkt Nienburg/i)).toBeInTheDocument();
    expect(screen.queryByText(/Wetterauer Zeitung/i)).not.toBeInTheDocument();
});

// UNIT TESTS
