import Grid, {GridProps} from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {Tooltip, Typography} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IDLinearProgress from "./IDLinearProgress";
import IDAccordionList from "./IDAccordionList";
import IDAccordion from "./IDAccordion";

/**
 * IDModalSidebar component. It accepts the same parameters as MUI Grid
 *
 * @constructor
 */
const StyledIDModalSidebar = styled(Grid)(({theme}) => ({
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
        <StyledIDModalSidebar {...props}>
            <Container>
                <Typography variant="subtitle1">
                    Konfigurationen
                    <Tooltip title="Info tooltip">
                        <HelpOutlineIcon style={{fontSize: "16px"}} />
                    </Tooltip>
                </Typography>
                <IDLinearProgress value={10} />
            </Container>
            <IDAccordionList>
                <IDAccordion disabled />
                <IDAccordion disabled />
                <IDAccordion />
                <IDAccordion />
                <IDAccordion />
                <IDAccordion />
            </IDAccordionList>
        </StyledIDModalSidebar>
    );
}

export default IdModalSidebar;
