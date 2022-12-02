import {Actions, Clients, FeaturesList} from "./api.types";
import {Dispatch} from "react";

export interface MainContentProps {
    clientsList: Clients[]
    filteredClientsList: Clients[]
    filteredFeatures: FeaturesList[]
}

export interface SidebarProps {
    clients: Clients[]
    filteredClients: Clients[]
    dispatchFilteredClients: Dispatch<Actions>
    filteredFeatures: FeaturesList[]
    dispatchFilteredFeatures: Dispatch<Actions>
    showId?: boolean;
}

export interface MultiSelectProps {
    values: Clients[] | FeaturesList[]
    placeholder: string
    filteredValues: Clients[] | FeaturesList[]
    dispatchFilteredValues: Dispatch<Actions>
    showId?: boolean
}
