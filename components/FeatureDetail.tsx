import * as React from "react";
import {useEffect} from "react";
import {styled, useTheme} from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ClientIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import Badge, {BadgeProps} from "@mui/material/Badge";

// import typescript Interfaces
import {FeatureDetail, TableView} from "../types/componentProps.types";
import {FeaturesConfig, Usage} from "../types/api.types";

// import utils
import {getSelectedUsages, getUsageStatusColor} from "../utils/utils";

// import custom components
import {getUsagesPerFeature} from "../api/FeatureDetailAPI";
import IDTabPanel from "./IDTabPanel";

const IDBadge = styled(Badge)<BadgeProps>(({theme}) => ({
    "& .MuiBadge-badge": {
        right: theme.spacing(-1),
        top: -2,
    },
}));

/**
 * setStateIsConfigSelected
 * @param {Array<FeaturesConfig>} featuresDetailConfigSelected
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsConfigSelected
 */
function setStateIsConfigSelected(
    featuresDetailConfigSelected: Array<FeaturesConfig>,
    setIsConfigSelected: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsConfigSelected(featuresDetailConfigSelected.length > 0);
}

/**
 *
 * @param {FeatureDetail} {featureStatus, featuresDetailConfig, featuresDetailConfigSelected}
 * @constructor
 */
function FeatureDetail({featureStatus, featuresDetailConfig, featuresDetailConfigSelected}: FeatureDetail) {
    const [activeTab, setActiveTab] = React.useState(0);
    const [usages, setUsages] = React.useState<Array<Usage>>([]);
    const [isConfigSelected, setIsConfigSelected] = React.useState<boolean>(false);
    const theme = useTheme();

    useEffect(() => {
        // if a configuration has been selected, show it only, otherwise show all configs
        const configToShow = featuresDetailConfigSelected.length ?
            featuresDetailConfigSelected :
            featuresDetailConfig;
        const usagesPromise = getUsagesPerFeature(configToShow);

        usagesPromise.then((data:Array<Usage>) => {
            if (data && Object.keys(data).length) {
                setUsages(data);

                /* if a configuration has been selected, show the relative Badge component with the number of usages
                that are displayed, otherwise show only the text label */
                setStateIsConfigSelected(featuresDetailConfigSelected, setIsConfigSelected);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featuresDetailConfig, featuresDetailConfigSelected]);

    const handleChange = (event: React.SyntheticEvent, newActiveTab: number) => {
        setActiveTab(newActiveTab);
    };

    return (
        <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
            <Tabs value={activeTab}
                textColor="inherit"
                indicatorColor="secondary"
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                    "& .MuiTab-root": {
                        "justifyContent": "flex-start",
                    },
                    "& .MuiTab-labelIcon": {
                        textTransform: "none",
                        minHeight: 0,
                        opacity: 1,
                        paddingTop: "12px",
                        paddingBottom: "12px",
                    },
                    "& .Mui-selected": {
                        bgcolor: "white", // Customize the background color of the selected tab
                    },
                    ".MuiTab-root": {
                        paddingRight: theme.spacing(3),
                    },
                }}>
                <Tab
                    id="simple-tab-index-0"
                    aria-controls="simple-tabpanel-0"
                    icon={<ClientIcon
                        color={getUsageStatusColor(TableView.CLIENT, usages)}/>}
                    iconPosition="start"
                    label={
                        isConfigSelected ?
                            <IDBadge badgeContent={getSelectedUsages(usages, TableView.CLIENT).length}
                                color="primary">
                                Mandant
                            </IDBadge> : "Mandant"
                    }/>
                <Tab
                    id="simple-tab-index-1"
                    aria-controls="simple-tabpanel-1"
                    icon={<CategoryIcon
                        color={getUsageStatusColor(TableView.CATEGORY, usages)}/>}
                    iconPosition="start"
                    label={
                        isConfigSelected ?
                            <IDBadge badgeContent={getSelectedUsages(usages, TableView.CATEGORY).length}
                                color="primary">
                                Kategorie
                            </IDBadge> : "Kategorie"
                    }/>
                <Tab
                    id="simple-tab-index-2"
                    aria-controls="simple-tabpanel-2"
                    icon={<TagIcon
                        color={getUsageStatusColor(TableView.TAG, usages)}/>}
                    iconPosition="start"
                    label={
                        isConfigSelected ?
                            <IDBadge badgeContent={getSelectedUsages(usages, TableView.TAG).length}
                                color="primary">
                                Tag
                            </IDBadge> : "Tag"
                    }/>
            </Tabs>
            <Box sx={{backgroundColor: "white", flex: "1 1 100%"}}>
                <IDTabPanel
                    activeTab={activeTab}
                    usages={usages}
                    tableView={TableView.CLIENT}
                    featureStatus={featureStatus.client}
                    featuresDetailConfig={featuresDetailConfig}
                    index={0} />
                <IDTabPanel
                    activeTab={activeTab}
                    usages={usages}
                    tableView={TableView.CATEGORY}
                    featureStatus={featureStatus.category}
                    featuresDetailConfig={featuresDetailConfig}
                    alertMessage="nicht konfigurierte Kategorien erhalten automatisch
                    die Konfiguration des Mandanten/Tags"
                    index={1} />
                <IDTabPanel
                    activeTab={activeTab}
                    usages={usages}
                    tableView={TableView.TAG}
                    featureStatus={featureStatus.tag}
                    featuresDetailConfig={featuresDetailConfig}
                    alertMessage="nicht konfigurierte Tags erhalten automatisch
                    die Konfiguration des Mandanten/der Kategorie"
                    index={2} />
            </Box>
        </Box>);
}

export default FeatureDetail;

/* start-test-block */
export {
    getSelectedUsages,
    setStateIsConfigSelected,
};
/* end-test-block */
