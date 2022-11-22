import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import {enableFetchMocks} from "jest-fetch-mock";

beforeEach(() => {
    enableFetchMocks();
});

test("renders the home page with all the static elements", async () => {
    render(<Home/>);
    expect(await screen.getByRole("img")).toBeInTheDocument();
});
