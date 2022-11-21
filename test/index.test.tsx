import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
    fetchMock.mockResponse(() => Promise.resolve("Success"));
});

test("renders the home page with all the static elements", () => {
    render(<Home clientList={[]}/>);
    expect(screen.getByRole("img")).toBeInTheDocument();
});
