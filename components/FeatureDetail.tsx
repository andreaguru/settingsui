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
import {getUsagesProFeature} from "../api/FeatureDetailAPI";
import {Usage} from "../types/api.types";
import {edidTheme} from "../themes/edid";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IDChipProps extends ChipProps {
    noUsage?: boolean;
}

const IDChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== "noUsage",
})<IDChipProps>(({theme, noUsage}) => ({
    color: noUsage ? theme.palette.neutral.main : theme.palette.success.main,
    backgroundColor: noUsage ? theme.palette.neutral.light : theme.palette.success.light,
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
 * @param {string} clientId
 * @constructor
 */
function FeatureDetail({featureStatus, featuresDetailConfig, featuresDetailConfigSelected}:FeatureDetail) {
    const [activeTab, setActiveTab] = React.useState(0);
    const [usages, setUsages] = React.useState<Array<Usage>>([]);
    const theme = useTheme();

    useEffect(() => {
        // if a configuration has been selected, show it only, otherwise show all configs
        const configToShow = featuresDetailConfigSelected.length ?
            featuresDetailConfigSelected :
            featuresDetailConfig;
        const usagesPromise = getUsagesProFeature(configToShow);
        usagesPromise.then((data:Array<Usage>) => {
            if (data && Object.keys(data).length) {
                setUsages(data);
            }
        });
    }, [featuresDetailConfig, featuresDetailConfigSelected]);

    const handleChange = (event: React.SyntheticEvent, newActiveTab: number) => {
        setActiveTab(newActiveTab);
    };

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
                }}>
                <Tab
                    icon={<ClientIcon color={getIconColorByStatus(featureStatus.client)} />}
                    iconPosition="start"
                    label="Mandant" {...a11yProps(0)} />
                <Tab
                    icon={<CategoryIcon color={getIconColorByStatus(featureStatus.category)} />}
                    iconPosition="start"
                    sx={{minWidth: theme.spacing(19)}}
                    label={
                        <IDBadge badgeContent={4} color="primary">
                            Kategorie
                        </IDBadge>} {...a11yProps(1)} />
                <Tab
                    icon={<TagIcon color={getIconColorByStatus(featureStatus.tag)} />}
                    iconPosition="start"
                    label="Tag" {...a11yProps(2)} />
            </Tabs>
            <Box sx={{backgroundColor: "white", flex: "1 1 100%"}}>
                <TabPanel value={activeTab} index={0}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <IDChip
                            noUsage={getSelectedUsages(usages, TableView.CLIENT).length === 0}
                            label={`aktiviert ${getSelectedUsages(usages, TableView.CLIENT).length || ""}`}
                            size="small" />
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.CLIENT)}
                        tableView={TableView.CLIENT}
                        status={featureStatus.client} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <Box sx={{display: "flex", alignItems: "center", gap: theme.spacing(2)}}>
                        <IDChip
                            noUsage={getSelectedUsages(usages, TableView.CATEGORY).length === 0}
                            label={`aktiviert ${getSelectedUsages(usages, TableView.CATEGORY).length || ""}`}
                            size="small" />
                        <IDChip label="error" size="small" />
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
                        status={featureStatus.category} />
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <IDChip
                            noUsage={getSelectedUsages(usages, TableView.TAG).length === 0}
                            label={`aktiviert ${getSelectedUsages(usages, TableView.TAG).length || ""}`}
                            size="small" />
                    </Box>
                    <IDDataGrid
                        usages={getSelectedUsages(usages, TableView.TAG)}
                        tableView={TableView.TAG}
                        status={featureStatus.tag} />
                </TabPanel>
            </Box>
        </Box>);
}

export default FeatureDetail;
