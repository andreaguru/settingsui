import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { ModalHeaderProps } from "types/componentProps.types";
import IDHelpIcon from "components/shared/IDHelpIcon";
import IDIconClose from "components/shared/IDIconClose";

const StyledModalHeader = styled(AppBar)(({ theme }) => ({
    height: theme.spacing(9),
    backgroundColor: "white",
    paddingLeft: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(5),
    position: "absolute",
    alignItems: "center",
    boxShadow: "0px 3px 6px #0000001A",
    ".modalTitle": {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
    },
}));

/**
 * ModalHeader component. It accepts the same parameters as MUI AppBar
 * @param {ModalHeader} props
 * @constructor
 */
function ModalHeader(props: ModalHeaderProps) {
    const { client, color, featuresDetail, onCloseAction } = props;

    return (
        <StyledModalHeader color={color}>
            <Typography variant="h6" className="modalTitle">
                <Typography sx={{ fontWeight: "medium" }} variant="inherit">
                    {client?.name}
                </Typography>
                <Typography>|</Typography>
                <Typography>{client?.id}</Typography>
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "medium" }}>
                {featuresDetail.name}
                <Tooltip title={featuresDetail.description} placement="right">
                    <IDHelpIcon />
                </Tooltip>
            </Typography>
            <IDIconClose onClick={onCloseAction} />
        </StyledModalHeader>
    );
}

export default ModalHeader;
