import {styled, useTheme} from "@mui/material/styles";
import {useRouter} from "next/router";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import {Tooltip} from "@mui/material";
import {IDModalHeader} from "../types/componentProps.types";

const IDStyledModalHeader = styled(AppBar)(({theme}) => ({
    height: theme.spacing(9),
    backgroundColor: "white",
    paddingLeft: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(5),
    alignItems: "center",
}));

/**
 * IDModalHeader component. It accepts the same parameters as MUI Grid
 * @param {IDModalHeader} props
 * @constructor
 */
function IdModalHeader(props:IDModalHeader) {
    const router = useRouter();
    const theme = useTheme();
    return (
        <IDStyledModalHeader {...props}>
            <Typography variant="subtitle1"
                color={theme.palette.neutral.main}
                sx={{display: "flex", alignItems: "center", gap: theme.spacing(1)}}>
                <Typography fontWeight="medium" color="black">TZ</Typography>
                <Typography>|</Typography>
                <Typography>337</Typography>
            </Typography>
            <Typography fontWeight="medium">
                Titolo della Header
                <Tooltip
                    title="Das CleverPush Anmelde-Widget zeigt ein Formular,
                    um sich für Newsletter oder Messenger anzumelden."
                    placement="right">
                    <HelpOutlineIcon fontSize="inherit" sx={{ml: .5}} />
                </Tooltip>
            </Typography>
            <IconButton color="inherit" className="modalClose" onClick={() => props.redirectToHome(router)}>
                <CloseIcon />
            </IconButton>
        </IDStyledModalHeader>
    );
}

export default IdModalHeader;
