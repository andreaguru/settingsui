import {ThemeProvider} from "@mui/material/styles";
import {edidTheme} from "../../../themes/edid";

import {useRouter} from "next/router";
import Modal from "@mui/material/Modal";
import FeatureDetail from "../../../components/FeatureDetail";
import Home from "../../index";
import {getFeaturesList} from "../../../utils/utils";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {getFeatureDetail} from "../../../api/FeatureDetailAPI";
import {useEffect, useState} from "react";

// import typescript Interfaces
import {HomeProps} from "../../../types/componentProps.types";
import {FeaturesDetail} from "../../../types/api.types";

// import custom components
import IDModalContent from "../../../components/IDModalContent";
import IdModalHeader from "../../../components/IDModalHeader";
import IDModalSidebar from "../../../components/IDModalSidebar";

/**
 *
 * @constructor
 */
function FeatureDetailPage({...props}: HomeProps) {
    const router = useRouter();
    const clientId = router.query.clientId as string;
    const clientName = router.query.clientname as string;
    const featureId = parseInt(router.query.featureId as string);
    const [featuresDetail, setFeaturesDetail] = useState<FeaturesDetail>({
        abbreviation: "",
        configurations: [],
        description: "",
        id: 0,
        name: "",
        technicalName: "",
    });

    useEffect(() => {
        if (featureId) {
            const featurePromise = getFeatureDetail(featureId);
            featurePromise.then((data) => {
                if (data && Object.keys(data).length) {
                    setFeaturesDetail(data);
                }
            });
        }
    }, [router, featureId]);

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

    if (!props.isLoading && !props.featureList.some((feat) => feat.technicalName === featureKey)) {
        return <p>Das Feature wurde nicht gefunden</p>;
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
                                    featuresDetailName={featuresDetail.name}
                                    clientName={clientName}
                                    position="absolute"
                                    color="inherit"
                                    onCloseAction={onCloseAction} />
                            </Grid>

                            {/* Table content*/}
                            <Grid item xs={featuresDetail.configurations.length ? 8 : 12} sx={{p: 3}}>
                                <FeatureDetail
                                    clientId={clientId}
                                    featureId={featureId}/>
                            </Grid>

                            {/* Sidebar*/}
                            { featuresDetail.configurations.length &&
                            <IDModalSidebar
                                featureKey={featuresDetail.technicalName}
                                featuresDetailConfig={featuresDetail.configurations}
                                item xs={4} />
                            }
                        </IDModalContent>
                    </Modal>
                </Home>
            }
        </ThemeProvider>
    );
}

export default FeatureDetailPage;
