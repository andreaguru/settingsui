import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";

/**
 * IDModalWindow component. It accepts the same parameters as MUI Grid
 *
 * @constructor
 */
const IDModalContent = styled(Grid)(({theme}) => ({
    backgroundColor: theme.palette.grey[100],
    maxWidth: "1280px",
    width: "95%",
    height: "95%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: theme.spacing(.5),
    paddingTop: theme.spacing(9),
}));

export default IDModalContent;
