import {styled} from "@mui/material/styles";
import Form from "@rjsf/mui";
import {FormProps} from "@rjsf/core";

const IDForm = styled(Form)<FormProps>(({theme}) => ({
    "width": "100%",
    "marginTop": `-${theme.spacing(1)}`,
    ".MuiOutlinedInput-input": {
        "&.Mui-disabled": {
            "all": "unset",
            "color": theme.palette.secondary.main,
            "fontSize": theme.typography.body2.fontSize,
            "width": "100%",
            "&[value='']": {
                "display": "none",
            },
        },
    },
    ".MuiOutlinedInput-notchedOutline": {
        display: "none",
    },
    ".MuiInputLabel-root": {
        "&.Mui-disabled": {
            all: "unset",
            color: theme.palette.secondary.light,
            fontSize: theme.typography.caption.fontSize,
        },
    },
    ".MuiFormControlLabel-root .MuiFormControlLabel-label": {
        "&.Mui-disabled": {
            fontSize: theme.typography.caption.fontSize,
            color: theme.palette.secondary.main,
        },
    },
    ".MuiFormControl-root": {
        ".MuiPaper-root": {
            "boxShadow": "unset",
        },
        ".MuiBox-root": {
            "h5": {
                fontSize: theme.typography.subtitle1.fontSize,
                fontWeight: "500",
            },
            "hr": {
                "display": "none",
            },
            ".MuiFormControl-root": {
                "h5": {
                    "display": "none",
                },
                ".MuiGrid-container": {
                    "marginBottom": theme.spacing(1),
                },
            },
        },
        ".MuiGrid-item": {
            paddingTop: 0,
            paddingLeft: theme.spacing(2),
        },
    },
    ".MuiBox-root": {
        all: "unset",
    },
}));

export default IDForm;
