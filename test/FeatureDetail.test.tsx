import "@testing-library/jest-dom";
import {getSelectedUsages, setStateCategoryList, setStateIsConfigSelected} from "../components/FeatureDetail";
import {mockedCategoryList, mockedFeatureDetailForClient} from "./mockData";
import {TableView} from "../types/componentProps.types";
import React from "react";

jest.mock("../api/FeatureDetailAPI", () => ({
    getCategoryList: jest.fn(() => Promise.resolve(mockedCategoryList)),
}));

// UNIT TESTS

test("returns the correct number of usages according to the mocked data", () => {
    const usagesForClient = getSelectedUsages(mockedFeatureDetailForClient.configurations[0].usages,
        TableView.CLIENT);
    const usagesForCategory = getSelectedUsages(mockedFeatureDetailForClient.configurations[0].usages,
        TableView.CATEGORY);
    const usagesForTag = getSelectedUsages(mockedFeatureDetailForClient.configurations[0].usages,
        TableView.TAG);
    expect(usagesForClient.length).toBe(0);
    expect(usagesForCategory.length).toBe(2);
    expect(usagesForTag.length).toBe(0);
});

test("setCategoryList state should be called with a mocked category list as param", async () => {
    const setCategoryList = jest.fn();
    jest
        .spyOn(React, "useState")
        .mockImplementation(() => [mockedCategoryList, setCategoryList]);
    await setStateCategoryList(
        mockedFeatureDetailForClient.configurations[0].usages,
        mockedFeatureDetailForClient.configurations,
        setCategoryList);
    expect(setCategoryList).toHaveBeenCalledWith(mockedCategoryList);
});

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
