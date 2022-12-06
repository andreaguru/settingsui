import {Clients, FeaturesList} from "./api.types";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

export interface MainContentProps {
    clientsList: Clients[]
    filteredClientsList: Clients[]
    filteredFeatures: FeaturesList[]
    featureStatus: boolean|null
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
    values: Clients[] | FeaturesList[]
    placeholder: string
    filteredValues: Clients[] | FeaturesList[]
    setFilteredValues: Dispatch<SetStateAction<Clients[]|FeaturesList[]>>
    showDetailInfo?: boolean
}

export interface IDRadioGroupProps {
    handleFeatureStatusChange: (event: ChangeEvent<HTMLInputElement>) => void
}
