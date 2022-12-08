import {Clients} from "./api.types";
import {Dispatch, SetStateAction} from "react";

export interface MainContentProps {
    clientsList: Clients[]
    filteredClientsList: Clients[]
}

export interface SidebarProps {
    clients: Clients[]
    filteredClients: Clients[]
    setFilteredClients: Dispatch<SetStateAction<Clients[]>>
    showDetailInfo?: boolean;
}

export interface IDComboSelectProps {
    values: Clients[]
    placeholder: string
    setFilteredValues: Dispatch<SetStateAction<Clients[]>>
    showDetailInfo?: boolean
}
