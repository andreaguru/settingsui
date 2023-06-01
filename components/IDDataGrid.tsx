import * as React from "react";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {styled, useTheme} from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";

const columns: GridColDef[] = [
    {
        field: "status",
        headerName: "Status",
        align: "center",
        renderCell: (params) => <CircleIcon color={params.value} />,
    },
    {
        field: "category",
        headerName: "Kategorie",
        editable: true,
    },
    {
        field: "categoryId",
        headerName: "Kategorie Id",
        headerAlign: "right",
        editable: true,
        align: "right",
    },
    {
        field: "configuration",
        headerName: "Konfiguration",
        editable: true,
    },
];

const rows = [
    {id: 1, status: "success", category: "Snow", categoryId: 12345, configuration: "config"},
    {id: 2, status: "warning", category: "Test", categoryId: 12476, configuration: "config2"},
    {id: 3, status: "disabled", category: "Test2", categoryId: 23456, configuration: "config3"},
];

const IDDataGridWrapper = styled(DataGrid)(({theme}) => ({
    [`& .${gridClasses.row}.odd`]: {
        "backgroundColor": theme.palette.grey[100],
    },
}));

/**
 * IDDataGrid Component
 * @constructor
 */
function IDDataGrid() {
    const theme = useTheme();

    return (
        <IDDataGridWrapper
            rows={rows}
            columns={columns}
            hideFooter
            autoHeight
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 !== 0 ? "odd" : ""
            }
            sx={{
                mt: theme.spacing(3),
            }}
        />
    );
}

export default IDDataGrid;

