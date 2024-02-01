// import utils
import {getIconColorByStatus} from "../utils/utils";

// UNIT TESTS
test("returns id_green if feature status is enabled", () => {
    const colors = getIconColorByStatus("ENABLED");
    expect(colors).toBe("id_green");
});

test("returns id_orange if status is enabled_and_disabled", () => {
    const colors = getIconColorByStatus("ENABLED_AND_DISABLED");
    expect(colors).toBe("id_orange");
});

