import {ClientsInterface, ReducerAction} from "./api.types";
import {Dispatch} from "react";

export interface MainContentProps {
    clientsList: ClientsInterface[];
    filteredClientsList: ClientsInterface[]
}

export interface SidebarProps {
   clients: ClientsInterface[];
   filteredClients: ClientsInterface[];
   dispatchFilteredClients: Dispatch<ReducerAction>;
}
