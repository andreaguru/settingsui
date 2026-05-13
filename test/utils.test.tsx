// import utils
import {
    expandedConfigReducer,
    getIconColorByStatus,
    getSelectedUsages,
    getUsageStatusColor,
    showUsageLabel,
} from "utils/utils";
import { TableView } from "types/api.types";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockedFeatureDetailForClient } from "./mockData";
import edid from "../themes/edid";
import { ExpandedConfigMethod } from "types/context.types";

// UNIT TESTS
test("returns id_green if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe(edid.palette.id_green.main);
});

test("returns id_orange if status is enabled_and_disabled", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe(edid.palette.id_orange.main);
});

test("returns the correct number of usages according to the mocked data", () => {
    const usagesForClient = getSelectedUsages(
        mockedFeatureDetailForClient.configurations[0].usages,
        TableView.CLIENT,
    );
    const usagesForCategory = getSelectedUsages(
        mockedFeatureDetailForClient.configurations[0].usages,
        TableView.CATEGORY,
    );
    const usagesForTag = getSelectedUsages(
        mockedFeatureDetailForClient.configurations[0].usages,
        TableView.TAG,
    );
    expect(usagesForClient.length).toBe(0);
    expect(usagesForCategory.length).toBe(2);
    expect(usagesForTag.length).toBe(0);
});

test("returns two Chip Components with 0 usages (both active and inactive)", () => {
    const result = showUsageLabel(mockedFeatureDetailForClient.configurations[0].usages);
    // If it returns an array of JSX elements
    render(<>{result}</>);
    // screen.debug();
    expect(screen.getByText("aktiviert 2")).toBeInTheDocument();
    expect(screen.getByText("deaktiviert 0")).toBeInTheDocument();
});
test("returns two Chip Components with 2 usages, only active", () => {
    const result = showUsageLabel(mockedFeatureDetailForClient.configurations[1].usages);
    // If it returns an array of JSX elements
    render(<>{result}</>);
    // screen.debug();
    expect(screen.getByText("aktiviert 1")).toBeInTheDocument();
    expect(screen.getByText("deaktiviert 0")).toBeInTheDocument();
});

test("return the right color according to the usages status", () => {
    // in the first mocked config all usages are active, therefore we expect a green color
    const usageStatusGreen = getUsageStatusColor(mockedFeatureDetailForClient.configurations[0].usages);
    // in the third mocked config the only usage has active false, therefore we expect a red color
    const usageStatusGray = getUsageStatusColor(mockedFeatureDetailForClient.configurations[2].usages);
    expect(usageStatusGreen).toBe("id_green");
    expect(usageStatusGray).toBe("id_red");
});

test("handles ExpandedConfigMethod.ADD", () => {
    const initialState = [1, 2, 3];
    const action = { type: ExpandedConfigMethod.ADD, payload: 4 };

    const newState = expandedConfigReducer(initialState, action);

    expect(newState).toContain(4);
    expect(newState.length).toBe(4);
});

test("handles ExpandedConfigMethod.REMOVE", () => {
    const initialState = [1, 2, 3];
    const action = { type: ExpandedConfigMethod.REMOVE, payload: 2 };

    const newState = expandedConfigReducer(initialState, action);

    expect(newState).not.toContain(2);
    expect(newState.length).toBe(2);
});
