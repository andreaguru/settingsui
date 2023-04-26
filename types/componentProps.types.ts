import {Client, ClientOrFeature, Feature} from "./api.types";
import {ReactNode} from "react";

/*
Interfaces for the Components
*/

export interface HomeProps {
    clients: Array<Client>
    filteredClients: Array<Client>
    filteredFeatures: Array<Feature>
    setFilteredClients: (name: Array<Client>) => void
    setFilteredFeatures: (name: Array<Feature>) => void
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
    filteredFeatures: Array<Feature>
    filteredClients: Array<Client>
    setFilteredClients: (name: Array<Client>) => void
    setFilteredFeatures: (name: Array<Feature>) => void
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export type IDComboSelectProps = {
    values: Array<ClientOrFeature>
    title: string
    placeholder: string
    setFilteredValues: (...args: []) => void;
    filteredValues: Array<ClientOrFeature>
    showId?: boolean
}

export interface ClientCardProps {
    client: Client
    showSelectedFeatures: (featuresPerClient:Array<Feature>) => Array<Feature>
}

export interface IDInfoButtonProps {
    align: string
}

export interface IDRadioGroupProps {
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}
