import "@testing-library/jest-dom";
import {getSelectedUsages, getUsageLabel} from "../components/FeatureDetail";
import {mockedFeatureDetailForClient} from "./mockData";
import {TableView} from "../types/componentProps.types";

// UNIT TESTS

test("returns two Chip Components with 0 usages (both active and inactive)", () => {
    const labels = getUsageLabel(mockedFeatureDetailForClient.configurations[0].usages, TableView.CLIENT);
    expect(labels[0].props.label).toContain("aktiviert 0");
    expect(labels[1].props.label).toContain("deaktiviert 0");
});
test("returns two Chip Components with 2 usages, only active", () => {
    const labels = getUsageLabel(mockedFeatureDetailForClient.configurations[0].usages, TableView.CATEGORY);
    expect(labels[0].props.label).toContain("aktiviert 2");
    expect(labels[1].props.label).toContain("deaktiviert 0");
});

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
