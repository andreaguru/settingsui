import "@testing-library/jest-dom";
import {showFeaturesPerStatus} from "../pages/_app";
import {mockedFeatures} from "./mockData";
import {FeatSelectedStatus} from "../types/componentProps.types";

/* UNIT TESTS */
test("showFeaturesPerStatus returns the only Feature that is enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ACTIVE);
    expect(features[0].name).toBe("traffective");
});

test("showFeaturesPerStatus returns the two Features that are not enabled", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.INACTIVE);
    expect(features[0].name).toBe("inArticleReco");
});

test("showFeaturesPerStatus returns all the features (no features removed)", () => {
    const features = showFeaturesPerStatus(mockedFeatures, FeatSelectedStatus.ALL);
    expect(features[0].name).toBe("traffective");
    expect(features[1].name).toBe("inArticleReco");
    expect(features[2].name).toBe("cleverPush");
});
