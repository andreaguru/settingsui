import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClientIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import IDDataGrid from "./IDDataGrid";

// import typescript Interfaces
import {FeatureDetail} from "../types/componentProps.types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * IDModalSidebar component. It accepts the same parameters as MUI Grid
 *
 * @constructor
 */
const IDChip = styled(Chip)(({theme}) => ({
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
}));

/**
 * TabPanel Component
 * @param {TabPanelProps} props
 * @constructor
 */
function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component="div">{children}</Typography>
                </Box>
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
 * @param {string} featureName
 * @constructor
 */
function FeatureDetail({clientId, featureName}:FeatureDetail) {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    /* console log these values for testing purpose. We will need them to make the component dynamic */
    console.log(clientId, featureName);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
            <Tabs value={value}
                textColor="inherit"
                indicatorColor="secondary"
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
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
                    icon={<ClientIcon color="success" />}
                    iconPosition="start"
                    label="Mandant" {...a11yProps(0)} />
                <Tab
                    icon={<CategoryIcon color="warning" />}
                    iconPosition="start"
                    label={
                        <Badge badgeContent={4} color="primary">
                            Kategorie
                        </Badge>} {...a11yProps(1)} />
                <Tab
                    icon={<TagIcon color="success" />}
                    iconPosition="start"
                    label="Tag" {...a11yProps(2)} />
            </Tabs>
            <Box sx={{backgroundColor: "white", flex: "1 1 100%"}}>
                <TabPanel value={value} index={0}>
                    <Box sx={{gap: theme.spacing(2)}}>
                        <IDChip label="success" size="small" />
                    </Box>
                    <IDDataGrid />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <IDChip label="success" size="small" />
                        <IDChip label="error" size="small" />
                    </Box>
                    <IDDataGrid />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <IDChip label="success" size="small" />
                    <IDDataGrid />
                </TabPanel>
            </Box>
        </Box>);
}

export default FeatureDetail;
