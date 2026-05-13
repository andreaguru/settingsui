import { use, useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { styled, useTheme } from "@mui/material/styles";

// MUI/Custom MUI Icons
import CircleIcon from "@mui/icons-material/Circle";
import IDHelpIcon from "components/shared/IDHelpIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// MUI/Custom MUI Components
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fade from "@mui/material/Fade";
import Image from "next/image";

import ConfigurationNotFound from "assets/conf_not_found.min.svg";

// import typescript Interfaces
import { IDDataGridProps, UsageRow } from "types/componentProps.types";
import {
    StatusValue,
    TableView,
    Usage,
    UsageId,
    UsageTarget,
    UsageToModifyOrDelete,
    UsageWithConfigName,
} from "types/api.types";

// import API Services
import { deleteUsagesPerFeature, editUpdateUsageStatus } from "services/FeatureDetailAPI";

// import global Context
import { dateTimeFormatter } from "utils/utils";
import IDModalButton from "components/shared/IDModalButton";
import ModalButtonsContainer from "components/shared/ModalButtonsContainer";
import FeatureDetailContext from "context/FeatureDetailContext";
import IDDataGridWrapper from "components/shared/IDDataGridWrapper";
import IDModalDialog from "../shared/IDModalDialog";
import logger from "../../logger";

const noRowsOverlay = () => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 2,
        }}
    >
        <Image
            alt=""
            src={ConfigurationNotFound as string}
            width={225}
            height={54}
            style={{
                objectFit: "contain",
            }}
        />
        <Typography
            variant="body2"
            sx={{
                color: "text.secondary",
                marginTop: 3,
            }}
        >
            Für diesen Bereich gibt es noch keine Einträge. Legen Sie eine Konfiguration an, um loszustarten.
        </Typography>
    </Box>
);


const IDSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: theme.palette.success.main,
        "&:hover": {
            backgroundColor: `${theme.palette.success.main}20`,
        },
        "& + .MuiSwitch-track": {
            backgroundColor: theme.palette.success.main,
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: theme.palette.success.main,
    },
    "& .MuiSwitch-switchBase": {
        color: theme.palette.error.main,
        "&:hover": {
            backgroundColor: `${theme.palette.error.main}20`,
        },
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
        backgroundColor: theme.palette.error.main,
    },
}));

/**
 * UsagesTable Component
 * @constructor
 */
function UsagesTable({ getCategoryName, getTagName, status, tableView, usages }: IDDataGridProps) {
    const theme = useTheme();
    const { handleUsageUpdate } = use(FeatureDetailContext);

    /* currentEditRow is the row that is currently being edited.
    When a row is being edited, it is not possible to delete it. */
    const [currentEditRow, setCurrentEditRow] = useState<GridRowId | undefined>();

    const [selectedUsage, setSelectedUsage] = useState<UsageToModifyOrDelete | undefined>();
    const [openWindow, setOpenWindow] = useState(false);
    const [usageState, setUsageState] = useState<boolean | undefined>();

    /* isUnsavedChange tells us that there is currently an unsaved change in the row. */
    const [isUnsavedChange, setIsUnsavedChange] = useState<boolean>(false);
    const [saveMode, setSaveMode] = useState<boolean>(false);

    const handleClose = () => {
        setSaveMode(false);
        if (!isUnsavedChange) {
            setCurrentEditRow(undefined);
            setUsageState(undefined);
        }
        setOpenWindow(false);
    };

    const handleEditMode = (rowId: GridRowId, isActive: boolean) => {
        if (isUnsavedChange) {
            setOpenWindow(true);
        } else if (!isUnsavedChange && currentEditRow === rowId) {
            handleClose();
        } else {
            setCurrentEditRow(rowId);
            setUsageState(isActive);
        }
    };

    const getDescriptionText = (rowId: GridRowId) => {
        if (currentEditRow === rowId) {
            return usageState ? "aktivieren" : "deaktivieren";
        }
        return "löschen";
    };

    /**
     * Retrieves the usage target ID based on the provided parameters.
     */
    const getUsageTarget = (
        id: UsageId,
        category: string | undefined,
        tag: string | undefined,
        rowId: GridRowId,
    ): UsageTarget => {
        switch (tableView) {
            case TableView.CATEGORY:
                return {
                    id: id.categoryId,
                    descriptionText:
                        `Möchten Sie die Usage auf der <strong>Kategorie ${category}</strong>
wirklich <strong>${getDescriptionText(rowId)}</strong>?`,
                };
            case TableView.TAG:
                return {
                    id: id.tagId,
                    descriptionText: `Möchten Sie die Usage auf dem <strong>Tag ${tag}</strong>
wirklich <strong>${getDescriptionText(rowId)}</strong>?`,
                };
            case TableView.CLIENT:
            default:
                return {
                    id: id.clientId,
                    descriptionText: `Möchten Sie die Usage auf dem gesamten Mandanten
wirklich <strong>${getDescriptionText(rowId)}</strong>?`,
                };
        }
    };

    const handleOpen = (
        usage: Usage,
        category: string | undefined,
        tag: string | undefined,
        rowId: GridRowId,
        rowStatus?: boolean,
    ) => {
        setSaveMode(true);
        const usageTarget = getUsageTarget(usage.id, category, tag, rowId);
        const newUsage: Usage = { ...usage };
        if (rowStatus !== undefined) {
            newUsage.active = rowStatus;
        }
        setSelectedUsage({ ...usageTarget, usage: newUsage });
        setOpenWindow(true);
    };

    const deleteUsage = (usageToDelete: UsageToModifyOrDelete | undefined) => {
        if (usageToDelete) {
            const { usage } = usageToDelete;
            // Remove the selected usage and reload the component in order to show the changes.
            deleteUsagesPerFeature(usage).then(() => handleUsageUpdate())
                .catch(error => {
                    logger.error(error, "Failed to delete usage:");
                    // Handle error appropriately
                });
        }
    };

    const updateUsage = (usageToModify: UsageToModifyOrDelete | undefined) => {
        if (usageToModify) {
            // Modify the status of a usage and reload the component in order to show the changes.
            editUpdateUsageStatus(usageToModify).then(() => {
                handleUsageUpdate();
                setCurrentEditRow(undefined);
                setUsageState(undefined);
                setIsUnsavedChange(false);
            })
                .catch(error => {
                    logger.error(error, "Failed to edit usage");
                    // Handle error appropriately
                });
        }
    };

    const hasUnsavedChanges = !saveMode && isUnsavedChange;

    const saveAndClose = () => {
        if (currentEditRow) {
            updateUsage(selectedUsage);
        } else {
            deleteUsage(selectedUsage);
        }
        handleClose();
    };

    const columns: GridColDef[] = [
        {
            field: "active",
            headerName: "Status",
            headerClassName: `${status === StatusValue.NONE ? "disabled" : ""}`,
            headerAlign: "center",
            sortable: status !== StatusValue.NONE,
            align: "center",
            width: 80,
            renderCell: params => (
                <div>
                    {params.id === currentEditRow ?
                        (
                            <FormControlLabel
                                value={params.value as unknown}
                                className={usageState ? "active" : "inactive"}
                                sx={{
                                    marginLeft: 0,
                                }}
                                control={
                                    <Fade in>
                                        <IDSwitch
                                            onChange={() => {
                                                setUsageState(prevState => !prevState);
                                                setIsUnsavedChange(!usageState !== params.value);
                                            }}
                                            checked={usageState}
                                        />
                                    </Fade>
                                }
                                label={usageState ? "aktiviert" : "deaktiviert"}
                                labelPlacement="bottom"
                            />
                        ) :
                        (
                            <CircleIcon color={params.value ? "id_green" : "id_red"} fontSize="small" />
                        )}
                </div>
            ),
        },
        {
            field: "category",
            headerName: "Kategorie",
            sortable: status !== StatusValue.NONE,
            flex: 0.6,
            valueGetter: (value, row: UsageWithConfigName) => getCategoryName(row?.id?.categoryId),
        },
        {
            field: "categoryId",
            headerName: "Kategorie Id",
            headerAlign: "right",
            sortable: status !== StatusValue.NONE,
            align: "right",
            width: 120,
            renderCell: params => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                    }}
                >
                    {(params.row as Usage).id?.categoryId}
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: theme.spacing(2.2) }}
                        onClick={() => handleEditMode(params.rowNode.id, (params.row as Usage).active)}
                    >
                        Abbrechen
                    </Button>
                </div>
            ),
        },
        {
            field: "tag",
            headerName: "Tag",
            sortable: status !== StatusValue.NONE,
            flex: 0.6,
            valueGetter: (value, row: UsageWithConfigName) => getTagName(row?.id?.tagId),
        },
        {
            field: "tagId",
            headerName: "Tag Id",
            headerAlign: "right",
            sortable: status !== StatusValue.NONE,
            align: "right",
            width: 130,
            renderCell: params => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                    }}
                >
                    {(params.row as Usage).id?.tagId}
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: theme.spacing(2.2) }}
                        onClick={() => handleEditMode(params.rowNode.id, (params.row as Usage).active)}
                    >
                        Abbrechen
                    </Button>
                </div>
            ),
        },
        {
            field: "configurationName",
            headerName: "Konfiguration",
            sortable: status !== StatusValue.NONE,
            width: 180,
            renderCell: params => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {params.value}
                    <Button
                        variant="contained"
                        disabled={usageState === (params.row as Usage).active}
                        size="small"
                        sx={{ mt: theme.spacing(2.2), alignSelf: "flex-start" }}
                        onClick={() => handleOpen(
                            (params.row as Usage),
                            getCategoryName((params.row as Usage).id?.categoryId),
                            getTagName((params.row as Usage).id?.tagId),
                            params.rowNode.id,
                            !(params.row as Usage).active,
                        )
                        }
                    >
                        Speichern
                    </Button>
                </div>
            ),
            renderHeader: params => (
                <div style={{ fontWeight: "500" }}>
                    {params.colDef.headerName}
                    <Tooltip
                        title="Alle Einstellungen eines Features können rechts unter
                        Konfigurationen in Instanzen angelegt/geändert werden.
                        Diese Instanzen können links auf den Ebenen Mandant,
                        Kategorie oder Tag angewendet und aktiviert werden."
                        placement="right"
                    >
                        <IDHelpIcon />
                    </Tooltip>
                </div>
            ),
        },
        {
            field: "modified",
            headerName: "Zuletzt geändert",
            headerClassName: "modifiedField",
            sortable: status !== StatusValue.NONE,
            width: 160,
            flex: 1,
            valueFormatter: value => dateTimeFormatter(value, "de-DE"),
        },
        {
            field: "deleteAndEdit",
            headerName: "",
            cellClassName: "deleteAndEdit",
            sortable: status !== StatusValue.NONE,
            width: 160,
            flex: 1,
            align: "right",
            renderCell: params => (
                <div style={{ fontWeight: "500" }}>
                    {params.colDef.headerName}
                    <IconButton
                        onClick={() => handleOpen(
                            (params.row as Usage),
                            getCategoryName((params.row as Usage).id?.categoryId),
                            getTagName((params.row as Usage).id?.tagId),
                            params.rowNode.id,
                        )
                        }
                        className="deleteUsage"
                    >
                        <DeleteIcon color="primary" />
                    </IconButton>
                    <IconButton
                        onClick={() => handleEditMode(params.rowNode.id, (params.row as Usage).active)}>
                        <EditIcon color="primary" />
                    </IconButton>
                </div>
            ),
        },
    ];

    const columnVisibilityModel = {
        category: tableView === TableView.CATEGORY,
        categoryId: tableView === TableView.CATEGORY,
        tag: tableView === TableView.TAG,
        tagId: tableView === TableView.TAG,
    };

    return (
        <>
            <IDModalDialog
                modalOpen={openWindow}
                modalWidth={`${theme.spacing(50)}px`}
                handleClose={handleClose}
                descriptionText={
                    hasUnsavedChanges ?
                        "Du arbeitest gerade an etwas... Bitte beende das, bevor du etwas anderes machst." :
                        selectedUsage?.descriptionText
                }
            >
                {/* code for the buttons is passed directly as children,
                as there is a lot of customization */}
                <ModalButtonsContainer>
                    {!hasUnsavedChanges ?
                        (
                            <>
                                <IDModalButton color="secondary" onClick={handleClose}>
                                    Abbrechen
                                </IDModalButton>
                                <IDModalButton color="primary" onClick={() => saveAndClose()}>
                                    {currentEditRow ? "Speichern" : "Löschen"}
                                </IDModalButton>
                            </>
                        ) :
                        (
                            // in case of error, we show only one button
                            // which has no other action apart from handleClose.
                            <IDModalButton onClick={handleClose}>Okay</IDModalButton>
                        )}
                </ModalButtonsContainer>
            </IDModalDialog>
            <IDDataGridWrapper
                rows={usages}
                getRowId={(row: UsageRow) => `${row.id?.configurationId}-${row.id?.clientId}-` +
                    `${row.id?.categoryId}-${row.id?.tagId}`
                }
                className={!usages.length ? "noUsage" : ""}
                columns={columns}
                columnVisibilityModel={columnVisibilityModel}
                disableColumnMenu
                hideFooter
                getRowClassName={params => {
                    const rowClasses = [
                        currentEditRow === params.id ? "editMode" : "",
                        params.indexRelativeToCurrentPage % 2 !== 0 ? "odd" : "",
                    ].filter(Boolean);
                    return rowClasses.join(" ");
                }}
                getRowHeight={params => (params.id === currentEditRow ? 115 : null)}
                slots={{
                    noRowsOverlay,
                }}
                sx={{
                    // if usage is deactivated, column title color is set to light gray
                    "& .MuiDataGrid-columnHeader": {
                        color: status === StatusValue.NONE ? "secondary.light" : "",
                    },
                }}
            />
        </>
    );
}

export default UsagesTable;
