import * as React from "react";
import {DataGrid, gridClasses, GridColDef} from "@mui/x-data-grid";
import {styled, useTheme} from "@mui/material/styles";
import CircleIcon from "@mui/icons-material/Circle";
import {alpha, Tooltip, Typography} from "@mui/material";
import IDHelpIcon from "../IDHelpIcon";
import configurationNotFound from "../../assets/conf_not_found.min.svg";

// import typescript Interfaces
import {IDDataGridProps, TableView} from "../../types/componentProps.types";
import Box from "@mui/material/Box";
import Image from "next/legacy/image";

const IDDataGridWrapper = styled(DataGrid)(({theme}) => ({
    "&.MuiDataGrid-root": {
        "display": "inline-flex",
        // style for header and footer
        "width": "100%",
        "height": `calc(100% - ${theme.spacing(3)})`,
        // end style for header and footer
        "maxWidth": "100%",
    },
    "&.noUsage": {
        color: theme.palette.secondary.light,
    },
    "& .MuiDataGrid-overlayWrapper": {
        "top": "20%",
    },
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
function IDDataGrid({usages, tableView, status, getCategoryName, getTagName}: IDDataGridProps) {
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: "active",
            headerName: "Status",
            headerClassName: `${status === "NONE" ? "disabled" : ""}`,
            headerAlign: "center",
            sortable: status !== "NONE",
            align: "center",
            width: 80,
            renderCell: (params) => <CircleIcon color={params.value ? "id_green" : "id_red"} fontSize="small" />,
        },
        {
            field: "category",
            headerName: "Kategorie",
            sortable: status !== "NONE",
            width: 110,
            valueGetter: (params) => getCategoryName(params.row?.id?.categoryId),
        },
        {
            field: "categoryId",
            headerName: "Kategorie Id",
            headerAlign: "right",
            sortable: status !== "NONE",
            align: "right",
            width: 130,
            valueGetter: (params) => params.row?.id?.categoryId,
        },
        {
            field: "tag",
            headerName: "Tag",
            sortable: status !== "NONE",
            width: 110,
            valueGetter: (params) => getTagName(params.row?.id?.tagId),
        },
        {
            field: "tagId",
            headerName: "Tag Id",
            headerAlign: "right",
            sortable: status !== "NONE",
            align: "right",
            width: 130,
            valueGetter: (params) => params.row?.id?.tagId,
        },
        {
            field: "configurationName",
            headerName: "Konfiguration",
            headerClassName: "configurationField",
            sortable: status !== "NONE",
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

    return (
        <IDDataGridWrapper
            rows={usages}
            getRowId={(row) => `${row.id.configurationId}-${row.id.clientId}-${row.id.categoryId}-${row.id.tagId}`}
            className={!usages.length ? "noUsage" : ""}
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
                        <Image alt=""
                            layout="fixed"
                            src={configurationNotFound}
                            width={225}
                            height={54}
                            objectFit="contain" />
                        <Typography variant="body2" color="text.secondary" marginTop={3}>
                            Hier gibts wohl nichts zu sehen...
                        </Typography>
                    </Box>
                ),
            }}
            sx={{
                "mt": theme.spacing(3),
                "color": "secondary.main",
                "minWidth": "100px",
                "maxWidth": "fit-content",
                "& .MuiDataGrid-columnHeader": {
                    "color": status === "NONE" ? "secondary.light" : "",
                },
            }}
        />
    );
}

export default IDDataGrid;

