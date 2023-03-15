import {Client, ClientOrFeature, Feature} from "./api.types";

/*
Interfaces for the Components
*/

export interface HomeProps {
    clients: any
    filteredClients: any
    filteredFeatures: any
    setFilteredClients: any
    setFilteredFeatures: any
    featureStatus: any
    setFeatureStatus: any
    showSelectedFeatures: any
    isLoading: boolean
    children?: React.ReactNode; // 👈 children prop typr
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
    setFilteredClients: (name: Array<Client>) => void;
    setFilteredFeatures: (name: Array<Feature>) => void
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export type IDComboSelectProps = {
    values: Array<ClientOrFeature>
    title: string
    placeholder: string
    setFilteredValues: (...args: any[]) => void;
    filteredValues: Array<ClientOrFeature>
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
    setFeatureStatus: (name: FeatSelectedStatus) => void
}

export enum FeatSelectedStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "",
}
