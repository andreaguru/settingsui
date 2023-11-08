import "@testing-library/jest-dom";
import {setStateIsConfigSelected} from "../components/FeatureDetail";
import {mockedCategoryList, mockedFeatureDetailForClient} from "./mockData";
import React from "react";

jest.mock("../api/FeatureDetailAPI", () => ({
    getCategoryList: jest.fn(() => Promise.resolve(mockedCategoryList)),
}));

// UNIT TESTS

test("setIsConfigSelected state should be called with true as param", () => {
    const setIsConfigSelected = jest.fn();
    jest
        .spyOn(React, "useState")
        .mockImplementation(() => [true, setIsConfigSelected]);
    setStateIsConfigSelected(
        mockedFeatureDetailForClient.configurations,
        setIsConfigSelected);
    expect(setIsConfigSelected).toHaveBeenCalledWith(true);
});

test("setIsConfigSelected state should be called with false as param", () => {
    const setIsConfigSelected = jest.fn();
    jest
        .spyOn(React, "useState")
        .mockImplementation(() => [true, setIsConfigSelected]);
    setStateIsConfigSelected(
        [],
        setIsConfigSelected);
    expect(setIsConfigSelected).toHaveBeenCalledWith(false);
});
