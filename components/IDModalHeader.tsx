import {styled, useTheme} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Tooltip} from "@mui/material";
import {IDModalHeader} from "../types/componentProps.types";
import IDHelpIcon from "./IDHelpIcon";

const IDStyledModalHeader = styled(AppBar)(({theme}) => ({
    height: theme.spacing(9),
    backgroundColor: "white",
    paddingLeft: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(5),
    alignItems: "center",
    boxShadow: "0px 3px 6px #0000001A",
}));

/**
 * IDModalHeader component. It accepts the same parameters as MUI Grid
 * @param {IDModalHeader} props
 * @constructor
 */
function IdModalHeader(props:IDModalHeader) {
    const theme = useTheme();
    const {
        onCloseAction,
        client,
        featuresDetailName,
        ...appBarProps
    } = props;

    return (
        <IDStyledModalHeader {...appBarProps}>
            <Typography variant="subtitle1"
                color={theme.palette.neutral.main}
                sx={{display: "flex", alignItems: "center", gap: theme.spacing(1)}}>
                <Typography fontWeight="medium" fontSize="20px">{client?.name}</Typography>
                <Typography>|</Typography>
                <Typography>{client?.id}</Typography>
            </Typography>
            <Typography fontSize="18px" fontWeight="medium">
                {featuresDetailName}
                <Tooltip
                    title="Das CleverPush Anmelde-Widget zeigt ein Formular,
                    um sich für Newsletter oder Messenger anzumelden."
                    placement="right">
                    <IDHelpIcon />
                </Tooltip>
            </Typography>
            <IconButton className="modalClose" onClick={onCloseAction}>
                <CloseIcon />
            </IconButton>
        </IDStyledModalHeader>
    );
}

export default IdModalHeader;
