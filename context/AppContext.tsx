import React, {createContext, Dispatch} from "react"

export const ClientsContext = createContext<any>([])

export const FilteredClientsContext = createContext<any>([])

export const FilteredClientsDispatchContext = createContext<Dispatch<any>>(() => null)