import * as React from "react";
import {useEffect} from "react";
import {styled, useTheme} from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClientIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Badge, {BadgeProps} from "@mui/material/Badge";

// import typescript Interfaces
import {FeatureDetail, TableView} from "../types/componentProps.types";
import {CategoryMap, CmsCategory, CmsTag, FeaturesConfig, Usage} from "../types/api.types";

// import utils
import {getUsageStatusColor, showUsageLabel} from "../utils/utils";

// import custom components
import IDDataGrid from "./IDDataGrid";
import IDAlert from "./IDAlert";
import {getCategoryList, getTagList, getUsagesPerFeature} from "../api/FeatureDetailAPI";
import {edidTheme} from "../themes/edid";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const IDBadge = styled(Badge)<BadgeProps>(({theme}) => ({
    "& .MuiBadge-badge": {
        right: theme.spacing(-1),
        top: -2,
    },
}));

/**
 * TabPanel Component
 * @param {TabPanelProps} props
 * @constructor
 */
function TabPanel(props: TabPanelProps) {
    const {children, value, index} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{padding: edidTheme.spacing(3), height: "100%"}}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

/**
     * getSelectedUsages
     * @param {Array<Usage>} usages
     * @param {TableView} tableView
     * @return {Array<Usage>}
     */
function getSelectedUsages(usages: Array<Usage>, tableView: TableView) {
    if (tableView === "CLIENT") {
        return usages.filter((usage) => usage.id.clientId !== 0);
    } else if (tableView === "CATEGORY") {
        return usages.filter((usage) => usage.id.categoryId !== 0);
    } else if (tableView === "TAG") {
        return usages.filter((usage) => usage.id.tagId !== 0);
    }
    return usages;
}

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
    const [categoryList, setCategoryList] = React.useState<Array<CategoryMap>>([]);
    const [tagList, setTagList] = React.useState<Array<CategoryMap>>([]);
    const [isConfigSelected, setIsConfigSelected] = React.useState<boolean>(false);
    const theme = useTheme();

    /**
     * setStateCategoryOrTagList
     * @param {Array<Usage>} usages
     * @param {Array<FeaturesConfig>} featuresDetailConfig
     * @param {string} elementType
     */
    function setStateCategoryOrTagList(
        usages: Array<Usage>,
        featuresDetailConfig: Array<FeaturesConfig>,
        elementType: TableView) {
        let promise: Promise<CategoryMap[]|CmsTag[]>;

        if (elementType === TableView.CATEGORY) {
            promise = getCategoryList(featuresDetailConfig[0].clientId);
        } else if (elementType === TableView.TAG) {
            promise = getTagList(featuresDetailConfig[0].clientId);
        } else {
            promise = Promise.reject(new Error("Kein Name"));
        }

        promise.then((data: Array<CategoryMap>) => {
            if (data && Object.keys(data).length) {
                if (elementType === TableView.CATEGORY) {
                    setCategoryList(data);
                } else if (elementType === TableView.TAG) {
                    setTagList(data);
                }
            }
        });
    }

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

    useEffect(() => {
        /* if usages are present, set categoryList state,
                so that it can be used in IDDataGrid Component to show category names */
        if (usages.length) {
            setStateCategoryOrTagList(usages, featuresDetailConfig, TableView.CATEGORY);
        }

        /* if usages are present, set tagList state,
                so that it can be used in IDDataGrid Component to show tag names */
        if (usages.length) {
            setStateCategoryOrTagList(usages, featuresDetailConfig, TableView.TAG);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usages]);

    const handleChange = (event: React.SyntheticEvent, newActiveTab: number) => {
        setActiveTab(newActiveTab);
    };

    /**
     * getCategoryOrTagName
     * @param {number} usageId
     * @param {TableView} usageType
     * @return {string}
     */
    function getCategoryOrTagName(usageId: number, usageType: string) {
        const usageList = usageType === TableView.CATEGORY ? categoryList : tagList;
        const usageObj = usageList.find((usage) => usage.id === usageId) as (CmsCategory|CmsTag);
        return usageObj.name;
    }

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
                <TabPanel value={activeTab} index={0}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        {showUsageLabel(usages, TableView.CLIENT)}
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.CLIENT)}
                        tableView={TableView.CLIENT}
                        status={featureStatus.client}
                        getCategoryOrTagName={getCategoryOrTagName} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <Box sx={{display: "flex", alignItems: "center", gap: theme.spacing(2)}}>
                        {showUsageLabel(usages, TableView.CATEGORY)}
                        <IDAlert
                            icon={<InfoOutlinedIcon sx={{fontSize: "medium"}} />}
                            severity="info"
                            sx={{marginLeft: "auto"}}>
                            <Typography variant="caption">
                                nicht konfigurierte Kategorien erhalten automatisch die Konfiguration des Mandanten/Tags
                            </Typography>
                        </IDAlert>
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.CATEGORY)}
                        tableView={TableView.CATEGORY}
                        status={featureStatus.category}
                        getCategoryOrTagName={getCategoryOrTagName} />
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <Box sx={{display: "flex", alignItems: "center", gap: theme.spacing(2)}}>
                        {showUsageLabel(usages, TableView.TAG)}
                        <IDAlert
                            icon={<InfoOutlinedIcon sx={{fontSize: "medium"}} />}
                            severity="info"
                            sx={{marginLeft: "auto"}}>
                            <Typography variant="caption">
                                nicht konfigurierte Tags erhalten automatisch
                                die Konfiguration des Mandanten/der Kategorie
                            </Typography>
                        </IDAlert>
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.TAG)}
                        tableView={TableView.TAG}
                        status={featureStatus.tag}
                        getCategoryOrTagName={getCategoryOrTagName} />
                </TabPanel>
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
