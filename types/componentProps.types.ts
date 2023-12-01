import {
    Client,
    ClientOrFeature,
    Feature,
    FeaturesConfig,
    FeaturesDetail,
    Status,
    StatusValue,
    Usage,
} from "./api.types";
import {MouseEvent, ReactNode} from "react";
import {AppBarProps} from "@mui/material/AppBar";
import {GridProps} from "@mui/material/Grid";
import {DividerProps} from "@mui/material";
import {RJSFSchema} from "@rjsf/utils";

/*
Interfaces for the Components
*/

export interface HomeProps {
    clients: Array<Client>
    featureList: Array<Feature>
    filteredClients: Array<Client>
    filteredFeatures: Array<Feature>
    setFilteredClients: (arg: Array<ClientOrFeature>) => void
    setFilteredFeatures: (arg: Array<ClientOrFeature>) => void
    featureStatus: FeatSelectedStatus | Array<string>
    setFeatureStatus: (name: FeatSelectedStatus) => void
    showSelectedFeatures: (featuresPerClient: Array<Feature>, showUniversalFeatures?: boolean) => Array<Feature>
    isLoading: boolean
    children?: ReactNode; // 👈 children prop type
}

export interface MainContentProps {
    clientsList: Array<Client>
    filteredClientsList: Array<Client>
    showSelectedFeatures: (featuresPerClient: Array<Feature>, showUniversalFeatures?: boolean) => Array<Feature>
    isLoading: boolean
}

export interface SidebarProps {
    clients: Array<Client>
    featureList: Array<Feature>
    filteredFeatures: Array<Feature>
    filteredClients: Array<Client>
    setFilteredClients: (arg: Array<ClientOrFeature>) => void
    setFilteredFeatures: (arg: Array<ClientOrFeature>) => void
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export type IDComboSelectProps = {
    values: Array<ClientOrFeature>
    title: string
    placeholder: string
    setFilteredValues: (arg:ClientOrFeature[]) => void;
    filteredValues: Array<ClientOrFeature>
    showId?: boolean
}

export interface ClientCardProps {
    client: Client
    showSelectedFeatures: (featuresPerClient: Array<Feature>, showUniversalFeatures?: boolean) => Array<Feature>
}

export interface IDInfoButtonProps {
    align?: string
}

export interface IDRadioGroupProps {
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export interface IDModalHeader extends AppBarProps {
    featuresDetail: FeaturesDetail;
    client?: Client;
    onCloseAction: () => void
}

export interface IDModalSidebarProps extends GridProps {
    featuresDetailConfig: Array<FeaturesConfig>;
    jsonSchema: RJSFSchema;
    setFeaturesDetailConfigSelected: (arg: Array<FeaturesConfig>) => void;
    featureKey: string;
}

export interface IdToggleProps {
    config?: FeaturesConfig;
    featureKey: string;
    toggleConfig: (event: MouseEvent<HTMLDivElement>, name: string) => void;
    disabled?: boolean;
    selected?: boolean;
    jsonSchema: RJSFSchema;
}

export interface IDDividerProps extends DividerProps {
    marginTop?: string,
}

export interface FeatureDetail {
    clientId: number;
    featureId: number;
    featureStatus: Status;
    featuresDetailConfig: Array<FeaturesConfig>;
    featuresDetailConfigSelected: Array<FeaturesConfig>;
}

export interface IDDataGridProps {
    usages: Array<Usage>;
    tableView: TableView;
    status: string;
    getCategoryName: (usageId: number) => string|undefined;
    getTagName: (usageId: number) => string|undefined;
}

export interface IDTabPanelProps {
    activeTab: number;
    usages: Array<Usage>;
    filteredUsages: Array<Usage>;
    tableView: TableView;
    featureStatus: StatusValue;
    featuresDetailConfig: Array<FeaturesConfig>;
    alertMessage?: string;
    index: number;
}

export enum TableView {
    CLIENT = "CLIENT",
    CATEGORY = "CATEGORY",
    TAG = "TAG",
}

export interface IDDividerProps extends DividerProps {
    marginTop?: string;
}

export interface IDLinearProgressProps {
    featuresDetailConfig: Array<FeaturesConfig>
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}
