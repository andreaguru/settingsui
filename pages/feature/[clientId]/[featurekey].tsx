import {ThemeProvider} from "@mui/material/styles";
import {edidTheme} from "../../../themes/edid";

import {useRouter} from "next/router";
import Modal from "@mui/material/Modal";
import FeatureDetail from "../../../components/detailPage/FeatureDetail";
import Home from "../../index";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {getFeatureDetailForClient} from "../../../api/FeatureDetailAPI";
import {useEffect, useState} from "react";

// import typescript Interfaces
import {HomeProps} from "../../../types/componentProps.types";
import {Client, Feature, FeaturesConfig, FeaturesDetail, Status} from "../../../types/api.types";

// import custom components
import IDModalContent from "../../../components/detailPage/IDModalContent";
import IdModalHeader from "../../../components/detailPage/IDModalHeader";
import IDModalSidebar from "../../../components/detailPage/IDModalSidebar";

/**
 *
 * @constructor
 */
function FeatureDetailPage({...props}: HomeProps) {
    const router = useRouter();
    const clientId = Number(router.query.clientId as string);
    let client: Client | undefined;
    const featureKey = router.query.featurekey as string;
    const [featuresDetail, setFeaturesDetail] = useState<FeaturesDetail>({
        shortName: "",
        configurations: [],
        description: "",
        id: 0,
        jsonSchema: {},
        name: "",
        key: "",
    });
    const [featuresDetailConfigSelected, setFeaturesDetailConfigSelected] = useState<Array<FeaturesConfig>>([]);

    useEffect(() => {
        if (featureKey && props.featureList.length > 0) {
            const featureId = props.featureList.filter((feature) => feature.key === featureKey)[0].id;
            const featurePromise: Promise<FeaturesDetail> = getFeatureDetailForClient(featureId, clientId);

            featurePromise
                .then((data) => {
                    if (data && Object.keys(data).length) {
                        setFeaturesDetail(data);
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return error;
                });
        }
    }, [router, featureKey, props.featureList, clientId]);

    const onCloseAction = () => {
    // get filteredFeatures and filteredClients if present in the url
        const {fltrClients, fltrFeatures} = router.query;

        // redirect to home page keeping the query params and the hash
        router.push({
            pathname: "/",
            query: {
                ...(fltrClients && {fltrClients}),
                ...(fltrFeatures && {fltrFeatures}),
            },
            hash: `id-clt-${clientId}`,
        });
    };

    if (!props.isLoading) {
        // check if the client id coming from router is present in the list
        if (props.clients.some((client) => client.id === clientId)) {
            client = props.clients.filter((client) => client.id === clientId)[0];
        } else {
            console.error("Client not found");
        }

        // Error handling in case feature o client are not present
        if (!props.featureList.some((feat) => feat.key === featureKey)) {
            return <p>Das Feature wurde nicht gefunden</p>;
        } else if (!client) {
            return <p>Der Mandant wurde nicht gefunden</p>;
        }
    }

    /**
     *
     * @param {string} featureKey
     * @param {Client} client
     * @return {string}
     */
    function getFeatureStatus(featureKey: string, client: Client): Status {
        const selectedFeature: Feature = client.features.find((feature) => feature.key === featureKey) as Feature;
        return selectedFeature.status;
    }

    return (
        <ThemeProvider theme={edidTheme}>
            <CssBaseline />
            {/* if loading is in progress, show the placeholder elements */
                props.isLoading && <Skeleton variant="rounded" height={"100vh"} />
            }
            {/* if loading is in progress, show the placeholder elements */
                !props.isLoading &&
                <Home {...props}>
                    <Modal
                        open={true} // The modal should always be shown on page load, it is the 'page'
                        onClose={onCloseAction}
                    >
                        <IDModalContent container rowSpacing={3}>

                            {/* Header*/}
                            <Grid item xs={12} sx={{position: "absolute", width: "100%", top: 0}}>
                                <IdModalHeader
                                    featuresDetail={featuresDetail}
                                    client={client}
                                    position="absolute"
                                    color="inherit"
                                    onCloseAction={onCloseAction} />
                            </Grid>

                            {/* Table content*/}
                            <Grid item xs={featuresDetail.configurations.length ? 8 : 12} sx={{p: 3, height: "100%"}}>
                                <FeatureDetail
                                    featureStatus={getFeatureStatus(featureKey, client as Client)}
                                    featuresDetailConfig={featuresDetail.configurations}
                                    featuresDetailConfigSelected={featuresDetailConfigSelected}/>
                            </Grid>

                            {/* Sidebar*/}
                            {featuresDetail.configurations.length > 0 &&
                                <IDModalSidebar
                                    featureKey={featureKey}
                                    featuresDetailConfig={featuresDetail.configurations}
                                    jsonSchema={featuresDetail.jsonSchema}
                                    setFeaturesDetailConfigSelected={setFeaturesDetailConfigSelected}
                                    item xs={4}/>
                            }
                        </IDModalContent>
                    </Modal>
                </Home>
            }
        </ThemeProvider>
    );
}

export default FeatureDetailPage;
