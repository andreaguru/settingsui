import { useRouter } from "next/router";
import { useCallback, use, useEffect, useMemo, useReducer, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { AppContext } from "context/AppContext";
import { featureUsagesEndpoint, getFeatureDetailForClient } from "services/FeatureDetailAPI";
import { useFeaturesPerClient } from "services/DashboardAPI";
import { expandedConfigReducer } from "utils/utils";
import { Client, Feature, FeaturesConfig, FeaturesDetail, Status, TableView } from "types/api.types";
import { FeatDetailContext } from "types/context.types";
import logger from "../../../logger";

const defaultFeaturesDetail: FeaturesDetail = {
    shortName: "",
    configurations: [],
    description: "",
    id: 0,
    jsonSchema: {},
    name: "",
    key: "",
};

export function useFeatureDetailPage() {
    const router = useRouter();
    const {
        clientIdInView,
        clients,
        clientsLoading,
        featureList,
        setClientIdInView,
    } = use(AppContext);
    const clientId = Number(router.query.clientId);
    const featureKey = router.query.featurekey as string;

    const [featureId, setFeatureId] = useState<number | undefined>();
    const [featuresDetailConfigSelected, setFeaturesDetailConfigSelected] = useState<FeaturesConfig[]>([]);
    const [activeTab, setActiveTab] = useState({ index: 0, name: TableView.CLIENT });
    const [configExpanded, dispatchConfigExpanded] = useReducer(expandedConfigReducer, [] as number[]);

    const { mutate } = useSWRConfig();
    const keyForFeatureDetail = useMemo(
        () => featureId ? [featureId, clientId] as const : null,
        [featureId, clientId],
    );

    const { data, error, isLoading } = useSWR<FeaturesDetail, Error>(
        keyForFeatureDetail,
        () => getFeatureDetailForClient(featureId, clientId),
    );

    const features = useFeaturesPerClient(clientId, clientIdInView);

    useEffect(() => {
        setClientIdInView(clientId);
    }, [clientId, setClientIdInView]);

    useEffect(() => {
        if (!featureKey || featureList.length === 0) {
            return;
        }

        const featId = featureList.find(feature => feature.key === featureKey)?.id;
        if (featId) {
            queueMicrotask(() => {
                setFeatureId(featId);
            });
        }
    }, [featureKey, featureList]);

    const handleFeatureUpdate = useCallback(async() => {
        await mutate(keyForFeatureDetail);
    }, [keyForFeatureDetail, mutate]);

    const handleUsageUpdate = useCallback(async() => {
        await mutate(`${featureUsagesEndpoint}/client/${clientId}/feature/${featureId}`);
    }, [clientId, featureId, mutate]);

    const featDetailContext: FeatDetailContext = useMemo(
        () => ({
            activeTab,
            setActiveTab,
            configExpanded,
            dispatchConfigExpanded,
            featureId,
            handleFeatureUpdate,
            handleUsageUpdate,
        }),
        [activeTab, configExpanded, featureId, handleFeatureUpdate, handleUsageUpdate],
    );

    const onCloseAction = useCallback(() => {
        const { "fltr-clients": fltrClients, "fltr-features": fltrFeatures } = router.query;
        void router.push({
            pathname: "/",
            query: {
                ...(fltrFeatures && { "fltr-features": fltrFeatures }),
                ...(fltrClients && { "fltr-clients": fltrClients }),
            },
            hash: `id-clt-${clientId}`,
        })
            .catch(pushError => {
                logger.error(pushError, "Failed to set usage:");
            });
    }, [clientId, router]);

    const client: Client | undefined = useMemo(
        () => clients.find((clnt: Client) => clnt.id === clientId),
        [clients, clientId],
    );

    let notFoundMessage: string | undefined;
    if (!clientsLoading) {
        if (!client) {
            notFoundMessage = "Der Mandant wurde nicht gefunden";
        } else if (!featureList.some(feat => feat.key === featureKey)) {
            notFoundMessage = "Das Feature wurde nicht gefunden";
        }
    }

    const featureStatus: Status | undefined = useMemo(() => {
        const selectedFeature: Feature | undefined =
            features.find((feature: Feature) => feature.key === featureKey);
        return selectedFeature?.status;
    }, [features, featureKey]);

    return {
        clientId,
        featureKey,
        client,
        clientsLoading,
        featuresDetail: data ?? defaultFeaturesDetail,
        featuresDetailConfigSelected,
        setFeaturesDetailConfigSelected,
        featDetailContext,
        onCloseAction,
        featureStatus,
        isFeatureDetailLoading: isLoading,
        featureDetailError: error,
        notFoundMessage,
    };
}
