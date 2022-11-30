import {ClientsInterface, ReducerActions} from "./api.types";
import {Dispatch} from "react";

export interface MainContentProps {
    clientsList: ClientsInterface[];
    filteredClientsList: ClientsInterface[]
}

export interface SidebarProps {
   clients: ClientsInterface[];
   filteredClients: ClientsInterface[];
   dispatchFilteredClients: Dispatch<ReducerActions>;
   showId?: boolean;
}

export interface MultiSelectProps {
   values: ClientsInterface[];
   filteredValues: ClientsInterface[];
   dispatchFilteredValues: Dispatch<ReducerActions>;
   showId?: boolean;
}
