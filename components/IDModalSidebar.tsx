import Grid, {GridProps} from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {Tooltip, Typography} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IDLinearProgress from "./IDLinearProgress";
import IDToggleList from "./IDToggleList";
import IDToggle from "./IDToggle";

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
 * @param {GridProps} props
 * @constructor
 */
function IdModalSidebar(props:GridProps) {
    return (
        <IDModalSidebarWrapper {...props}>
            <Container>
                <Typography variant="subtitle1">
                    Konfigurationen
                    <Tooltip title="Info tooltip">
                        <HelpOutlineIcon style={{fontSize: "16px"}} />
                    </Tooltip>
                </Typography>
                <IDLinearProgress value={10} />
            </Container>
            <IDToggleList>
                <IDToggle disabled />
                <IDToggle disabled />
                <IDToggle />
                <IDToggle />
                <IDToggle />
                <IDToggle />
            </IDToggleList>
        </IDModalSidebarWrapper>
    );
}

export default IdModalSidebar;
