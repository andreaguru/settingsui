import { DividerProps } from "@mui/material";
import { AppBarProps } from "@mui/material/AppBar";
import { GridProps } from "@mui/material/Grid";
import { RJSFSchema } from "@rjsf/utils";
import { AppProps } from "next/app";
import { Dispatch, MouseEvent, ReactNode, SetStateAction } from "react";
import { NextPage } from "next";
import {
    Client,
    Feature,
    FeaturesConfig,
    FeaturesDetail,
    Status,
    StatusValue,
    TableView,
    Usage,
} from "./api.types";
import { GridValidRowModel } from "@mui/x-data-grid";
import { IChangeEvent } from "@rjsf/core";

/*
Interfaces for the Components
*/

export interface IDAppProps extends AppProps {
    Component: NextPage<HomeProps>
}

export type SetFilteredValue<T extends Client | Feature> =
    Dispatch<SetStateAction<T[]>>;

export type UsageRow = Partial<Usage> & GridValidRowModel;

export interface HomeProps {
    setFeatureStatus?: (name: FeatSelectedStatus) => void
    children?: ReactNode // 👈 children prop type
}

export interface HeaderProps {
    name?: string
    img?: string
}

export interface ButtonProps {
    handler: () => void
}

export interface SidebarProps {
    setFeatureStatus?: (name: FeatSelectedStatus) => void
}

export interface IDComboSelectProps<T extends Client | Feature> {
    values: T[]
    title: string
    placeholder: string
    setFilteredValues: SetFilteredValue<T>
    filteredValues: T[]
    showId?: boolean
}

export interface ClientCardProps {
    client: Client
}

export interface IDInfoButtonProps {
    align?: string
}

export interface IDRadioGroupProps {
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export interface ModalHeaderProps extends AppBarProps {
    featuresDetail: FeaturesDetail
    client?: Client
    onCloseAction: () => void
}

export interface ModalSidebarProps extends GridProps {
    featuresDetailConfig: FeaturesConfig[]
    jsonSchema: RJSFSchema
    setFeaturesDetailConfigSelected: (arg: FeaturesConfig[]) => void
    featureKey: string
}

export interface IdToggleProps {
    config?: FeaturesConfig
    featureKey: string
    toggleConfig: (event: MouseEvent<HTMLDivElement>, name: string) => void
    disabled?: boolean
    selected?: boolean
    jsonSchema: RJSFSchema | null
    setShowConfigRemovedAlert: (arg: boolean) => void
}

export interface IDDividerProps extends DividerProps {
    marginTop?: string
}

export interface FeatureDetailProps {
    clientId: number
    featureId: number
    featureStatus: Status | undefined
    featuresDetailConfig: FeaturesConfig[]
    featuresDetailConfigSelected: FeaturesConfig[]
}

export interface IDDataGridProps {
    usages: Usage[]
    tableView: TableView
    status?: StatusValue
    getCategoryName: (usageId: number) => string | undefined
    getTagName: (usageId: number) => string | undefined
}

export interface IDTabPanelProps {
    activeTab: number
    clientId: number
    usages: Usage[]
    filteredUsages: Usage[]
    tableView: TableView
    featureStatus?: StatusValue
    alertMessage?: string
    index: number
}

export interface IDModalProps {
    modalOpen: boolean
    modalWidth?: string
    handleClose: () => void
    titleText?: string
    descriptionText?: string
    textAlign?: "left" | "center" | "right" | "justify" | "inherit"
    children?: ReactNode
}

export interface IDFormProps {
    id: number
    clientId: number
    name: string
    jsonSchema: RJSFSchema
    settings: Record<string, unknown>
    editMode: boolean
    formData: Record<string, unknown>
    submitForm: (event: IChangeEvent) => void
    handleFormChange: (event: IChangeEvent) => void
    showResetDialog: (backToView?: boolean) => void
}

export interface FormAddUsageProps {
    configId: number
    closeModal: () => void
    setShowSuccessMessage: (showSuccessMessage: boolean) => void
}

export interface FormAddConfigurationProps {
    jsonSchema: RJSFSchema
    closeModal: () => void
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}

export type MUIColorType = "inherit" | "primary" | "secondary" | "success" |
    "error" | "info" | "warning" | "default"

export type DialogAction =
    { type: "DELETE_CONFIG" } |
    { type: "EDIT_CONFIG" } |
    { type: "RESET_CONFIG"; payload?: boolean } |
    { type: "SERVER_ERROR" } |
    { type: "CLEAN_FLOW" }


export interface DialogFlow {
    openConfirmModal: boolean
    action?: "delete" | "edit" | "reset" | "error"
    button?: string
    description?: string
    viewMode?: boolean
}
