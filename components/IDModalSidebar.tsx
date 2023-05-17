import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";

/**
 * IDModalSidebar component. It accepts the same parameters as MUI Grid
 *
 * @constructor
 */
const IDModalSidebar = styled(Grid)(({theme}) => ({
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(3),
    backgroundColor: "white",
}));

export default IDModalSidebar;
