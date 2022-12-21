import {Clients, Feature, FeaturesList} from "./api.types";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

/*
Interfaces for the Components
*/

export interface MainContentProps {
    clientsList: Clients[]
    filteredClientsList: Clients[]
    filteredFeatures: FeaturesList[]
    showSelectedFeatures: (featuresPerClient: Feature[]) => Feature[]
    featureStatus: string
}

export interface SidebarProps {
    clients: Clients[]
    filteredClients: Clients[]
    setFilteredClients: Dispatch<SetStateAction<Clients[]>>
    filteredFeatures: FeaturesList[]
    setFilteredFeatures: Dispatch<SetStateAction<FeaturesList[]>>
    handleFeatureStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface IDComboSelectProps {
    values: Clients[]
    placeholder: string
    setFilteredValues: Dispatch<SetStateAction<Clients[]>> | Dispatch<SetStateAction<FeaturesList[]>>
    checkIfHasFeatures?: boolean
    showDetailInfo?: boolean
}

export interface IDInfoButtonProps {
    align: string
}

export interface IDRadioGroupProps {
    handleFeatureStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}
