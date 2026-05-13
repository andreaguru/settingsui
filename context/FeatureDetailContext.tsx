import { createContext } from "react";
import { FeatDetailContext } from "types/context.types";
import { TableView } from "types/api.types";

const FeatureDetailContext = createContext<FeatDetailContext>({
    activeTab: {
        index: 0,
        name: TableView.CLIENT,
    },
    setActiveTab: () => {
        // Function initially empty
    },
    configExpanded: [],
    dispatchConfigExpanded: () => {
        // Function initially empty
    },
    handleFeatureUpdate: () => {
        // Function initially empty
    },
    handleUsageUpdate: () => {
        // Function initially empty
    },
});

export default FeatureDetailContext;
