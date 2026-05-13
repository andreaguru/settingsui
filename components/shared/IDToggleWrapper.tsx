import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

const IDToggleWrapper = styled(Card)(({ theme }) => ({
    flexBasis: "100%",
    "&.Mui-disabled": {
        backgroundColor: theme.palette.grey[200],
    },
    ".MuiCardHeader-root": {
        paddingBottom: 0,
    },
    ".MuiBox-root": {
        cursor: "pointer",
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.light,
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 6px 0px",
        },
    },
    ".MuiList-root": {
        h6: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            "&:first-of-type": {
                marginTop: 0,
            },
        },
    },
    ".MuiListItem-root": {
        display: "block",
        wordWrap: "break-word",
        lineHeight: 1,
    },
    ".MuiCardContent-root": {
        paddingTop: 0,
        position: "relative",
        backgroundColor: "white",
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
    },
}));

export default IDToggleWrapper
