import Modal from "@mui/material/Modal";
import FeatureDetail from "components/detailPage/FeatureDetail";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { AppContext } from "context/AppContext";
import FeatureDetailContext from "context/FeatureDetailContext";
import { use } from "react";

// import custom components
import ModalContent from "components/detailPage/ModalContent";
import ModalHeader from "components/detailPage/ModalHeader";
import ModalSidebar from "components/detailPage/ModalSidebar";
import IDLoader from "components/shared/IDLoader";
import Home from "../../index";
import { useFeatureDetailPage } from "../../../features/feature-detail/hooks/useFeatureDetailPage";

/**
 *
 * @constructor
 */
function FeatureDetailPage() {
    const { clientsLoading } = use(AppContext);
    const {
        client,
        clientId,
        featDetailContext,
        featureDetailError,
        featureKey,
        featureStatus,
        featuresDetail,
        featuresDetailConfigSelected,
        isFeatureDetailLoading,
        notFoundMessage,
        onCloseAction,
        setFeaturesDetailConfigSelected,
    } = useFeatureDetailPage();

    if (isFeatureDetailLoading) return <IDLoader />;
    if (featureDetailError) return <div>Etwas ist leider schief gelaufen. Versuchen Sie es noch einmal.</div>;
    if (notFoundMessage) return <p>{notFoundMessage}</p>;

    return (
        <FeatureDetailContext value={featDetailContext}>
            <CssBaseline />
            {
                /* if loading is in progress, show the placeholder elements */
                clientsLoading && <Skeleton variant="rounded" height="100vh" />
            }
            {
                /* if loading is in progress, show the placeholder elements */
                !clientsLoading && (
                    <Home>
                        <Modal
                            open // The modal should always be shown on page load, it is the 'page'
                            onClose={onCloseAction}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ModalContent container rowSpacing={3}>
                                {/* Header */}
                                <Grid container>
                                    <ModalHeader
                                        featuresDetail={featuresDetail}
                                        client={client}
                                        color="inherit"
                                        onCloseAction={onCloseAction}
                                    />
                                </Grid>
                                {/* Table content */}
                                <Grid size={{ xs: 8 }} sx={{ p: 3, height: "100%" }}>
                                    <FeatureDetail
                                        clientId={clientId}
                                        featureId={featuresDetail.id}
                                        featureStatus={featureStatus}
                                        featuresDetailConfig={featuresDetail.configurations}
                                        featuresDetailConfigSelected={featuresDetailConfigSelected}
                                    />
                                </Grid>
                                {/* Sidebar */}
                                <ModalSidebar
                                    featureKey={featureKey}
                                    featuresDetailConfig={featuresDetail.configurations}
                                    jsonSchema={featuresDetail.jsonSchema}
                                    setFeaturesDetailConfigSelected={setFeaturesDetailConfigSelected}
                                    size={{ xs: 4 }}
                                />
                            </ModalContent>
                        </Modal>
                    </Home>
                )
            }
        </FeatureDetailContext>
    );
}

export default FeatureDetailPage;
