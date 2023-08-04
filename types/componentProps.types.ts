import {Client, ClientOrFeature, Feature, FeaturesConfig} from "./api.types";
import {ReactNode} from "react";
import {AppBarProps} from "@mui/material/AppBar";
import {GridProps} from "@mui/material/Grid";

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
    showSelectedFeatures: (featuresPerClient:Array<Feature>) => Array<Feature>
    isLoading: boolean
    children?: ReactNode; // 👈 children prop type
}

export interface MainContentProps {
    clientsList: Array<Client>
    filteredClientsList: Array<Client>
    showSelectedFeatures: (featuresPerClient:Array<Feature>) => Array<Feature>
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
    showSelectedFeatures: (featuresPerClient:Array<Feature>) => Array<Feature>
}

export interface IDInfoButtonProps {
    align?: string
}

export interface IDRadioGroupProps {
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export interface IDModalHeader extends AppBarProps {
    featuresDetailName: string;
    clientId: string;
    clientList: Array<Client>;
    onCloseAction: () => void
}

export interface IDModalSidebar extends GridProps {
    featuresDetailConfig: FeaturesConfig[];
    featureKey: string;
}

export interface IdToggleProps {
    config?: FeaturesConfig;
    featureKey: string;
    disabled?: boolean,
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}
