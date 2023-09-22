import * as React from "react";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {styled, useTheme} from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import {alpha, Tooltip} from "@mui/material";
import IDHelpIcon from "./IDHelpIcon";

const rows = [
    {id: 1, status: "success", category: "Snow", categoryId: 12345, configuration: "config"},
    {id: 2, status: "disabled", category: "Test", categoryId: 12476, configuration: "config2"},
    {id: 3, status: "disabled", category: "Test2", categoryId: 23456, configuration: "config3"},
];

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
function IDDataGrid() {
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            maxWidth: 80,
            renderCell: (params) => <CircleIcon color={params.value} fontSize="small" />,
        },
        {
            field: "category",
            headerName: "Kategorie",
            minWidth: 110,
        },
        {
            field: "categoryId",
            headerName: "Kategorie Id",
            headerAlign: "right",
            align: "right",
            minWidth: 130,
        },
        {
            field: "configuration",
            headerName: "Konfiguration",
            headerClassName: "configurationField",
            minWidth: 160,
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
                color: "secondary.main",
            }}
        />
    );
}

export default IDDataGrid;

