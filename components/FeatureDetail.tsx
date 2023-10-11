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
import Chip, {ChipProps} from "@mui/material/Chip";
import Badge, {BadgeProps} from "@mui/material/Badge";

// import typescript Interfaces
import {FeatureDetail, TableView} from "../types/componentProps.types";

// import utils
import {getIconColorByStatus} from "../utils/utils";

// import custom components
import IDDataGrid from "./IDDataGrid";
import IDAlert from "./IDAlert";
import {getCategoryList, getUsagesProFeature} from "../api/FeatureDetailAPI";
import {CategoryMap, CmsCategory, Usage} from "../types/api.types";
import {edidTheme} from "../themes/edid";
import {EmotionJSX} from "@emotion/react/types/jsx-namespace";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const IDChip = styled(Chip)<ChipProps>(({theme, color}) => ({
    color: color && color !== "default" ? theme.palette[color].main : theme.palette.neutral.main,
    backgroundColor: color && color !== "default" ? theme.palette[color].light : theme.palette.neutral.light,
}));

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
 *
 * @param {number} index
 * @return {object}
 */
function a11yProps(index: number) {
    return {
        "id": `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

/**
     *
     * @param {number} activeLength
     * @param {number} inactiveLength
     * @return {EmotionJSX.Element[]}
     */
function renderUsageStatus(activeLength: number, inactiveLength: number): EmotionJSX.Element[] {
    return [
        <IDChip
            key="1"
            label={`aktiviert ${activeLength}`}
            color="success"
            disabled={activeLength === 0}
            size="small" />,
        <IDChip
            key="2"
            label={`deaktiviert ${inactiveLength}`}
            color="error"
            disabled={inactiveLength === 0}
            size="small" />,
    ];
}

/**
     *
     * @param {Array<Usage>} usages
     * @param {TableView} tableView
     * @return {EmotionJSX.Element[]}
     */
function getUsageLabel(usages: Array<Usage>, tableView: TableView) {
    if (tableView === "CLIENT") {
        const activeClients = usages.filter((usage) => usage.id.clientId !== 0 && usage.active);
        const inactiveClients = usages.filter((usage) => usage.id.clientId !== 0 && !usage.active);
        return renderUsageStatus(activeClients.length, inactiveClients.length);
    } else if (tableView === "CATEGORY") {
        const activeCategories = usages.filter((usage) => usage.id.categoryId !== 0 && usage.active);
        const inactiveCategories = usages.filter((usage) => usage.id.categoryId !== 0 && !usage.active);
        return renderUsageStatus(activeCategories.length, inactiveCategories.length);
    } else if (tableView === "TAG") {
        const activeTags = usages.filter((usage) => usage.id.tagId !== 0 && usage.active);
        const inactiveTags = usages.filter((usage) => usage.id.tagId !== 0 && !usage.active);
        return renderUsageStatus(activeTags.length, inactiveTags.length);
    } else {
        // per default render aktiviert and deaktiviert with value 0
        return renderUsageStatus(0, 0);
    }
}

/**
     *
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
 *
 * @param {FeatureDetail} {featureStatus, featuresDetailConfig, featuresDetailConfigSelected}
 * @constructor
 */
function FeatureDetail({featureStatus, featuresDetailConfig, featuresDetailConfigSelected}: FeatureDetail) {
    const [activeTab, setActiveTab] = React.useState(0);
    const [usages, setUsages] = React.useState<Array<Usage>>([]);
    const [categoryList, setCategoryList] = React.useState<Array<CategoryMap>>([]);
    const [isConfigSelected, setIsConfigSelected] = React.useState<boolean>(false);
    const theme = useTheme();

    useEffect(() => {
        if (usages.length > 0) {
            const categoryPromise = getCategoryList(featuresDetailConfig[0].clientId);
            categoryPromise.then((data: Array<CategoryMap>) => {
                if (data && Object.keys(data).length) {
                    setCategoryList(data);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usages]);

    useEffect(() => {
        // if a configuration has been selected, show it only, otherwise show all configs
        const configToShow = featuresDetailConfigSelected.length ?
            featuresDetailConfigSelected :
            featuresDetailConfig;
        const usagesPromise = getUsagesProFeature(configToShow);
        usagesPromise.then((data:Array<Usage>) => {
            if (data && Object.keys(data).length) {
                setUsages(data);
                if (!featuresDetailConfigSelected.length) {
                    setIsConfigSelected(false);
                } else {
                    setIsConfigSelected(true);
                }
            }
        });
    }, [featuresDetailConfig, featuresDetailConfigSelected]);

    const handleChange = (event: React.SyntheticEvent, newActiveTab: number) => {
        setActiveTab(newActiveTab);
    };

    /**
     *
     * @param {number} categoryId
     * @return {string}
     */
    function getCategoryName(categoryId: number) {
        const categoryObj = categoryList.find((cat) => cat.id === categoryId) as CmsCategory;
        return categoryObj.name;
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
                    icon={<ClientIcon color={getIconColorByStatus(featureStatus.client)} />}
                    iconPosition="start"
                    label={
                        isConfigSelected ?
                            <IDBadge badgeContent={getSelectedUsages(usages, TableView.CLIENT).length}
                                color="primary">
                            Mandant
                            </IDBadge> : "Mandant"
                    } {...a11yProps(0)} />
                <Tab
                    icon={<CategoryIcon color={getIconColorByStatus(featureStatus.category)} />}
                    iconPosition="start"
                    label={
                        isConfigSelected ?
                            <IDBadge badgeContent={getSelectedUsages(usages, TableView.CATEGORY).length}
                                color="primary">
                            Kategorie
                            </IDBadge> : "Kategorie"
                    }
                    {...a11yProps(1)} />
                <Tab
                    icon={<TagIcon color={getIconColorByStatus(featureStatus.tag)} />}
                    iconPosition="start"
                    label={
                        isConfigSelected ?
                            <IDBadge badgeContent={getSelectedUsages(usages, TableView.TAG).length}
                                color="primary">
                            Tag
                            </IDBadge> : "Tag"
                    } {...a11yProps(2)} />
            </Tabs>
            <Box sx={{backgroundColor: "white", flex: "1 1 100%"}}>
                <TabPanel value={activeTab} index={0}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        {getUsageLabel(usages, TableView.CLIENT)}
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.CLIENT)}
                        tableView={TableView.CLIENT}
                        status={featureStatus.client}
                        getCategoryName={getCategoryName} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <Box sx={{display: "flex", alignItems: "center", gap: theme.spacing(2)}}>
                        {getUsageLabel(usages, TableView.CATEGORY)}
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
                        getCategoryName={getCategoryName} />
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        {getUsageLabel(usages, TableView.TAG)}
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.TAG)}
                        tableView={TableView.TAG}
                        status={featureStatus.tag}
                        getCategoryName={getCategoryName} />
                </TabPanel>
            </Box>
        </Box>);
}

export default FeatureDetail;

/* start-test-block */
export {
    getUsageLabel,
    getSelectedUsages,
};
/* end-test-block */
