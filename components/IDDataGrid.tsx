import * as React from "react";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {styled, useTheme} from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import {alpha, Tooltip, Typography} from "@mui/material";
import IDHelpIcon from "./IDHelpIcon";

// import typescript Interfaces
import {IDDataGrid, TableView} from "../types/componentProps.types";
import {Usage} from "../types/api.types";
import Box from "@mui/material/Box";

const IDDataGridWrapper = styled(DataGrid)(({theme}) => ({
    [`& .${gridClasses.columnSeparator}`]: {
        "visibility": "visible",
    },
    "& .configurationField": {
        [`& .${gridClasses.columnSeparator}`]: {
            "display": "none",
        },
    },
    "& .MuiDataGrid-columnHeaderDraggableContainer": {
        "display": "block",
    },
    [`& .${gridClasses.row}`]: {
        "&.odd": {
            "backgroundColor": theme.palette.grey[100],
        },
        "&:hover": {
            "backgroundColor": alpha(theme.palette.primary.main, .08),
        },
    },
}));

/**
 * IDDataGrid Component
 * @constructor
 */
function IDDataGrid({usages, tableView}:IDDataGrid) {
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: "active",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            width: 80,
            renderCell: (params) => <CircleIcon color={params.value ? "success" : "disabled"} fontSize="small" />,
        },
        {
            field: "category",
            headerName: "Kategorie",
            width: 110,
        },
        {
            field: "categoryId",
            headerName: "Kategorie Id",
            headerAlign: "right",
            align: "right",
            width: 130,
        },
        {
            field: "tag",
            headerName: "Tag",
            width: 110,
        },
        {
            field: "tagId",
            headerName: "Tag Id",
            headerAlign: "right",
            align: "right",
            width: 130,
        },
        {
            field: "configurationName",
            headerName: "Konfiguration",
            headerClassName: "configurationField",
            width: 160,
            renderHeader: (params) => <div style={{fontWeight: "500"}}>
                {params.colDef.headerName}
                <Tooltip
                    title="Alle Einstellungen eines Features können rechts unter Konfigurationen in Instanzen
                    angelegt/geändert werden. Diese Instanzen können links auf den Ebenen Mandant,
                    Kategorie oder Tag angewendet und aktiviert werden."
                    placement="right">
                    <IDHelpIcon />
                </Tooltip>
            </div>,
        },
    ];

    const columnVisibilityModel = {
        category: tableView === TableView.CATEGORY,
        categoryId: tableView === TableView.CATEGORY,
        tag: tableView === TableView.TAG,
        tagId: tableView === TableView.TAG,
    };

    /**
     *
     * @param {Array<Usage>} usages
     * @return {Array<Usage>}
     */
    function getSelectedUsages(usages: Array<Usage>) {
        if (tableView === "CLIENT") {
            return usages.filter((usage) => usage.id.clientId !== 0);
        } else if (tableView === "CATEGORY") {
            return usages.filter((usage) => usage.id.categoryId !== 0);
        } else if (tableView === "TAG") {
            return usages.filter((usage) => usage.id.tagId !== 0);
        }
        return usages;
    }

    return (
        <IDDataGridWrapper
            rows={getSelectedUsages(usages)}
            getRowId={(row) => `${row.id.configurationId}-${row.id.clientId}-${row.id.categoryId}-${row.id.tagId}`}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            hideFooter
            autoHeight
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 !== 0 ? "odd" : ""
            }
            slots={{
                noRowsOverlay: () => (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        padding={2}
                    >
                        <IDHelpIcon />
                        <Typography variant="body1">No rows available</Typography>
                    </Box>
                ),
            }}
            sx={{
                mt: theme.spacing(3),
                color: "secondary.main",
                minWidth: "100px",
                maxWidth: "fit-content",
            }}
        />
    );
}

export default IDDataGrid;

