import {Actions, Clients} from "./api.types";
import {Dispatch} from "react";

export interface MainContentProps {
    clientsList: Clients[]
    filteredClientsList: Clients[]
}

export interface SidebarProps {
    clients: Clients[]
    filteredClients: Clients[]
    dispatchFilteredClients: Dispatch<Actions>
    showDetailInfo?: boolean;
}

export interface MultiSelectProps {
    values: Clients[]
    placeholder: string
    filteredValues: Clients[]
    dispatchFilteredValues: Dispatch<Actions>
    showDetailInfo?: boolean
}
