import {getSelectedUsages, showUsageLabel} from "../utils/utils";
import * as React from "react";
import {useEffect} from "react";
import Box from "@mui/material/Box";

// import custom components
import IDDataGrid from "./IDDataGrid";
import {edidTheme} from "../themes/edid";
import {getCategoryList, getTagList} from "../api/FeatureDetailAPI";

// import typescript Interfaces
import {IDTabPanelProps} from "../types/componentProps.types";
import {CategoryMap, CmsTag, FeaturesConfig, Usage} from "../types/api.types";
import {useTheme} from "@mui/material/styles";
import IDAlert from "./IDAlert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";

/**
 * IDTabPanel component. It renders the Tab panels inside DataGrid
 * @param {IDModalHeader} props
 * @constructor
 */
function IDTabPanel({
    activeTab,
    usages,
    tableView,
    featureStatus,
    featuresDetailConfig,
    alertMessage,
    index}: IDTabPanelProps) {
    const [categoryList, setCategoryList] = React.useState<Array<CategoryMap>>([]);
    const [tagList, setTagList] = React.useState<Array<CmsTag>>([]);
    const theme = useTheme();

    /**
     * setStateCategoryList
     * @param {Array<Usage>} usages
     * @param {Array<FeaturesConfig>} featuresDetailConfig
     */
    function setStateCategoryList(usages: Array<Usage>, featuresDetailConfig: Array<FeaturesConfig>) {
        const promiseCatList = getCategoryList(featuresDetailConfig[0].clientId);

        promiseCatList.then((data: Array<CategoryMap>) => {
            if (data && Object.keys(data).length) {
                setCategoryList(data);
            }
        });
    }
    /**
     * setStateTagList
     * @param {Array<Usage>} usages
     * @param {Array<FeaturesConfig>} featuresDetailConfig
     */
    function setStateTagList(usages: Array<Usage>, featuresDetailConfig: Array<FeaturesConfig>) {
        const promiseTagList = getTagList(featuresDetailConfig[0].clientId);

        promiseTagList.then((data: Array<CmsTag>) => {
            if (data && Object.keys(data).length) {
                setTagList(data);
            }
        });
    }

    useEffect(() => {
        /* if usages are present, set categoryList state,
                so that it can be used in IDDataGrid Component to show category names */
        if (usages.length) {
            setStateCategoryList(usages, featuresDetailConfig);
            setStateTagList(usages, featuresDetailConfig);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usages]);

    /**
     * getCategoryName
     * @param {number} usageId
     * @return {string}
     */
    function getCategoryName(usageId: number) {
        const usageObj = categoryList.find((usage) => usage.id === usageId);
        return usageObj?.name;
    }

    /**
     * getTagName
     * @param {number} usageId
     * @return {string}
     */
    function getTagName(usageId: number) {
        const usageObj = tagList.find((usage) => usage.id === usageId);
        return usageObj?.name;
    }

    return (
        <>
            {activeTab === index &&
            <div role="tabpanel"
                hidden={activeTab !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                style={{padding: edidTheme.spacing(3), height: "100%"}}>
                <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                    {showUsageLabel(usages, tableView)}
                    <IDAlert
                        icon={<InfoOutlinedIcon sx={{fontSize: "medium"}}/>}
                        severity="info"
                        sx={{marginLeft: "auto"}}>
                        <Typography variant="caption">
                            {alertMessage}
                        </Typography>
                    </IDAlert>
                </Box>
                <IDDataGrid
                    usages={getSelectedUsages(usages, tableView)}
                    tableView={tableView}
                    status={featureStatus}
                    getCategoryName={getCategoryName}
                    getTagName={getTagName}/>
            </div>
            }
        </>
    );
}

export default IDTabPanel;
