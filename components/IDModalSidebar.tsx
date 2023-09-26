import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {Tooltip, Typography} from "@mui/material";
import IDLinearProgress from "./IDLinearProgress";
import IDToggleList from "./IDToggleList";
import IDToggle from "./IDToggle";
import IDHelpIcon from "./IDHelpIcon";
import {IDModalSidebar} from "../types/componentProps.types";
import {MouseEvent} from "react";
import {FeaturesConfig} from "../types/api.types";

/**
 * IDModalSidebar component. It accepts the same parameters as MUI Grid
 *
 * @constructor
 */
const IDModalSidebarWrapper = styled(Grid)(({theme}) => ({
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(3),
    backgroundColor: "white",
}));

/**
 * The Ippen Digital Modal Sidebar component.
 * @param {IDModalSidebar} props
 * @constructor
 */
function IdModalSidebar(props:IDModalSidebar) {
    const {
        featuresDetailConfig,
        setFeaturesDetailConfigSelected,
        featureKey,
        ...modalSidebarProps} = props;

    /**
     *
     * @param {MouseEvent<HTMLElement>} event
     * @param {string} name
     */
    function toggleConfig(event: MouseEvent<HTMLElement>, name: string) {
        const selectedEl = event.target as Element;
        // if toggle button is clicked, do nothing
        if (selectedEl?.parentElement?.tagName !== "BUTTON") {
            let featuresDetailConfigSelected: Array<FeaturesConfig>;
            event.currentTarget.classList.toggle("Mui-selected");
            if (event.currentTarget.classList.contains("Mui-selected")) {
                featuresDetailConfigSelected = featuresDetailConfig
                    .filter((conf: FeaturesConfig) => conf.name === name);
            } else {
                featuresDetailConfigSelected = [];
            }
            setFeaturesDetailConfigSelected(featuresDetailConfigSelected);
        }
    }

    return (
        <IDModalSidebarWrapper {...modalSidebarProps}>
            <Container>
                <Typography variant="subtitle1" sx={{marginTop: 1}}>
                    Konfigurationen
                    <Tooltip title="Alle Einstellungen eines Features werden hier
                    unter Konfigurationen in Instanzen angelegt/geändert. Diese Instanzen können
                    links auf den Ebenen (Mandant, Kategorie, Tag)
                    an der gewünschten Stelle gesetzt und aktiviert werden."
                    placement="top">
                        <IDHelpIcon/>
                    </Tooltip>
                </Typography>
                <IDLinearProgress value={10}/>
            </Container>
            <IDToggleList sx={{paddingBottom: 2}}>
                {featuresDetailConfig.map((config, index) => (
                    <IDToggle
                        key={index}
                        featureKey={featureKey}
                        config={config}
                        disabled={!config.usages.length}
                        toggleConfig={toggleConfig}/>
                ))}
            </IDToggleList>
        </IDModalSidebarWrapper>
    );
}

export default IdModalSidebar;
