import {Client, ClientOrFeature, Feature} from "./api.types";
import {ChangeEvent} from "react";

/*
Interfaces for the Components
*/

export interface MainContentProps {
    clientsList: Array<Client>
    filteredClientsList: Array<Client>
    filteredFeatures: Array<Feature>
    showSelectedFeatures: (
        featuresPerClient:Array<Feature>,
        featureStatus:FeatSelectedStatus,
        filteredFeatures:Array<Feature>) => Array<Feature>
    featureStatus: FeatSelectedStatus
    isLoading: boolean
}

export interface SidebarProps {
    clients: Array<Client>
    features: Array<Feature>
    setFilteredClients: (name: Array<Client>) => void;
    setFilteredFeatures: (name: Array<Feature>) => void;
    handleFeatureStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export type IDComboSelectProps = {
    values: Array<ClientOrFeature>
    title: string
    placeholder: string
    setFilteredValues: (...args: any[]) => void;
    showId?: boolean
}

export interface ClientCardProps {
    client: Client
    filteredFeatures: Array<Feature>
    showSelectedFeatures: (
        featuresPerClient:Array<Feature>,
        featureStatus:FeatSelectedStatus,
        filteredFeatures:Array<Feature>) => Array<Feature>
    featureStatus: FeatSelectedStatus
}

export interface IDInfoButtonProps {
    align: string
}

export interface IDRadioGroupProps {
    handleFeatureStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}
