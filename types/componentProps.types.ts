import {Client, ClientOrFeature, Feature, FeaturesDetail,} from "./api.types";
import {ReactNode} from "react";
import {AppBarProps} from "@mui/material/AppBar";
import {DividerProps} from "@mui/material";

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

export interface IDDividerProps extends DividerProps {
    marginTop?: string,
}

export interface IDDividerProps extends DividerProps {
    marginTop?: string;
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}
