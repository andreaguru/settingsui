import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClientIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/AccountTree";
import TagIcon from "@mui/icons-material/LocalOffer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Chip from "@mui/material/Chip";
import Badge, {BadgeProps} from "@mui/material/Badge";

// import custom components
import IDDataGrid from "./IDDataGrid";
import IDAlert from "./IDAlert";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const IDChip = styled(Chip)(({theme}) => ({
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
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
 * @constructor
 */
function FeatureDetail() {
    const [activeTab, setActiveTab] = React.useState(0);
    const theme = useTheme();

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
                }}>
                <Tab
                    icon={<ClientIcon color="success" />}
                    iconPosition="start"
                    label="Mandant" {...a11yProps(0)} />
                <Tab
                    icon={<CategoryIcon color="warning" />}
                    iconPosition="start"
                    sx={{minWidth: theme.spacing(19)}}
                    label={
                        <IDBadge badgeContent={4} color="primary">
                            Kategorie
                        </IDBadge>} {...a11yProps(1)} />
                <Tab
                    icon={<TagIcon color="success" />}
                    iconPosition="start"
                    label="Tag" {...a11yProps(2)} />
            </Tabs>
            <Box sx={{backgroundColor: "white", flex: "1 1 100%"}}>
                <TabPanel value={activeTab} index={0}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <IDChip label="success" size="small"/>
                    </Box>
                    <IDDataGrid/>
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <Box sx={{display: "flex", alignItems: "center", gap: theme.spacing(2)}}>
                        <IDChip label="success" size="small"/>
                        <IDChip label="error" size="small"/>
                        <IDAlert
                            icon={<InfoOutlinedIcon sx={{fontSize: "medium"}}/>}
                            severity="info"
                            sx={{marginLeft: "auto"}}>
                            <Typography variant="caption">
                                nicht konfigurierte Kategorien erhalten automatisch die Konfiguration des Mandanten/Tags
                            </Typography>
                        </IDAlert>
                    </Box>
                    <IDDataGrid/>
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <IDChip label="success" size="small" />
                    </Box>
                    <IDDataGrid />
                </TabPanel>
            </Box>
        </Box>);
}

export default FeatureDetail;
