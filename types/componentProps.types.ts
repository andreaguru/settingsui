import {Clients, FeaturesList} from "./api.types";
import {Dispatch, SetStateAction} from "react";

export interface MainContentProps {
    clientsList: Clients[]
    filteredClientsList: Clients[]
    filteredFeatures: FeaturesList[]
}

export interface SidebarProps {
    clients: Clients[]
    filteredClients: Clients[]
    setFilteredClients: Dispatch<SetStateAction<Clients[]>>
    filteredFeatures: FeaturesList[]
    setFilteredFeatures: Dispatch<SetStateAction<FeaturesList[]>>
    showDetailInfo?: boolean
}

export interface MultiSelectProps {
    values: Clients[] | FeaturesList[]
    placeholder: string
    filteredValues: Clients[] | FeaturesList[]
    setFilteredValues: Dispatch<SetStateAction<Clients[]|FeaturesList[]>>
    showDetailInfo?: boolean
}
