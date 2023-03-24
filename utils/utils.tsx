import {Client} from "../types/api.types";

/**
     * getFeaturesList
     * @param {Array<Client>} clients
     * @return {Array<Feature>}
     */
export function getFeaturesList(clients:Array<Client>) {
    return clients.length > 0 ? clients[0].features : [];
}
