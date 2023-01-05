import {Client, ClientOrFeatureList, Feature, FeatureList} from "./api.types";
import {ChangeEvent} from "react";

/*
Interfaces for the Components
*/

export interface MainContentProps {
    clientsList: Client[]
    filteredClientsList: Client[]
    filteredFeatures: FeatureList[]
    showSelectedFeatures: (featuresPerClient:Feature[], featureStatus:FeatSelectedStatus, filteredFeatures:FeatureList[]) => Feature[]
    featureStatus: FeatSelectedStatus
}

export interface SidebarProps {
    clients: Client[]
    filteredClients: Client[]
    setFilteredClients: (name: Client[]) => void;
    filteredFeatures: FeatureList[]
    setFilteredFeatures: (name: FeatureList[]) => void;
    handleFeatureStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export type IDComboSelectProps = {
    values: ClientOrFeatureList[]
    title: string
    placeholder: string
    setFilteredValues: (name: any) => void;
    checkIfHasFeatures?: boolean
    showId?: boolean
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
