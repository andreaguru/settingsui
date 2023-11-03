// import utils
import {getIconColorByStatus, showUsageLabel} from "../utils/utils";
import {mockedFeatureDetailForClient} from "./mockData";
import {TableView} from "../types/componentProps.types";

// UNIT TESTS
test("returns id_green if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe("id_green");
});

test("returns id_orange if status is enabled_and_disabled", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("id_orange");
});


test("returns two Chip Components with 0 usages (both active and inactive)", () => {
    const labels = showUsageLabel(mockedFeatureDetailForClient.configurations[0].usages, TableView.CLIENT);
    expect(labels[0].props.label).toContain("aktiviert 0");
    expect(labels[1].props.label).toContain("deaktiviert 0");
});
test("returns two Chip Components with 2 usages, only active", () => {
    const labels = showUsageLabel(mockedFeatureDetailForClient.configurations[0].usages, TableView.CATEGORY);
    expect(labels[0].props.label).toContain("aktiviert 2");
    expect(labels[1].props.label).toContain("deaktiviert 0");
});
