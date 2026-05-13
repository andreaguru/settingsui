import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";

const IDDataGridWrapper = styled(DataGrid)(({ theme }) => ({
    "&.MuiDataGrid-root": {
        display: "inline-flex",
        width: "100%",
        maxHeight: `calc(100% - ${theme.spacing(13)})`,
        minHeight: theme.spacing(30),
        maxWidth: "100%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        color: "secondary.main",
    },
    ".MuiDataGrid-virtualScrollerRenderZone": {
        width: "100%",
    },
    ".MuiDataGrid-cell": {
        border: "none",
        alignItems: "start",
        lineHeight: 1.43,
        paddingTop: `${theme.spacing(2)}`,
    },
    "&.noUsage": {
        color: theme.palette.secondary.light,
    },
    [`& .${gridClasses.columnSeparator}`]: {
        visibility: "visible",
    },
    ".modifiedField": {
        [`& .${gridClasses.columnSeparator}`]: {
            display: "none",
        },
    },
    ".MuiDataGrid-columnHeaderDraggableContainer": {
        display: "block",
    },
    [`& .${gridClasses.row}`]: {
        overflow: "hidden",
        transition: "min-height 0.3s, max-height 0.3s",
        "&.odd": {
            backgroundColor: theme.palette.grey[100],
        },
        ".deleteAndEdit": {
            paddingTop: theme.spacing(1),
            visibility: "hidden",
        },
        "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            ".deleteAndEdit": {
                visibility: "visible",
            },
        },
        "& .MuiDataGrid-cell:focus": {
            outline: "none",
        },
        "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
        },
        "&.editMode": {
            border: `solid 2px ${theme.palette.primary.main}`,
            width: "100%",
            backgroundColor: "white",
            "&:hover": {
                backgroundColor: "white",
                ".deleteAndEdit .deleteUsage ": {
                    visibility: "hidden",
                },
            },
        },
    },
    ".MuiFormControlLabel-root": {
        marginTop: "-10px",
        ".MuiFormControlLabel-label": {
            fontSize: theme.typography.caption.fontSize,
        },
        "&.active .MuiFormControlLabel-label": {
            color: theme.palette.success.main,
        },
        "&.inactive .MuiFormControlLabel-label": {
            color: theme.palette.error.main,
        },
    },
    ".MuiDataGrid-filler": {
        visibility: "hidden",
    },
    ".MuiDataGrid-columnHeaderTitleContainer": {
        height: "100%",
    },
}));

export default IDDataGridWrapper;
