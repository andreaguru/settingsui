import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import Sidebar from "../components/Sidebar";

beforeEach(() => {
    fetchMock.mockResponse(() => Promise.resolve("Success"));
});

test("renders the home page", () => {
    render(<Sidebar clientsList={[]} filteredClientsList={[]} dispatchFilteredClientsList={() => null} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
});
