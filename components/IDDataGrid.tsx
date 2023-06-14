import * as React from "react";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {styled, useTheme} from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import {alpha, Tooltip} from "@mui/material";
import IDHelpIcon from "./IDHelpIcon";

const rows = [
    {id: 1, status: "success", category: "Snow", categoryId: 12345, configuration: "config"},
    {id: 2, status: "warning", category: "Test", categoryId: 12476, configuration: "config2"},
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
            headerClassName: "configurationField",
            minWidth: 170,
            renderHeader: (params) => <div style={{fontWeight: "500"}}>
                {params.colDef.headerName}
                <Tooltip
                    title="Alle Einstellungen eines Features werden hier
                    unter Konfigurationen in Instanzen angelegt/geändert. Diese Instanzen können
                    links auf den Ebenen (Mandant, Kategorie, Tag)
                    an der gewünschten Stelle gesetzt und aktiviert werden."
                    placement="right">
                    <IDHelpIcon />
                </Tooltip>
            </div>,
            editable: true,
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
            }}
        />
    );
}

export default IDDataGrid;

