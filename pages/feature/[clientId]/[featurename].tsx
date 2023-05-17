import {useRouter} from "next/router";
import Modal from "@mui/material/Modal";
import DialogContent from "@mui/material/DialogContent";
import FeatureDetail from "../../../components/FeatureDetail";
import Home from "../../index";
import {getFeaturesList} from "../../../utils/utils";
import Skeleton from "@mui/material/Skeleton";
import {HomeProps} from "../../../types/componentProps.types";

const style = {
    position: "absolute" as const,
    top: "2%",
    left: "2%",
    width: "95%",
    height: "95%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
};

/**
 *
 * @constructor
 */
function FeatureDetailPage({...props}: HomeProps) {
    const router = useRouter();
    const clientId = router.query.clientId as string;
    const featureName = router.query.featurename as string;

    if (!props.isLoading && !getFeaturesList(props.clients).some((feat) => feat.name === featureName)) {
        return "Das Feature wurde nicht gefunden";
    }

    return (
        <>
            {/* if loading is in progress, show the placeholder elements */
                props.isLoading && <Skeleton variant="rounded" height={"100vh"} />
            }
            {/* if loading is in progress, show the placeholder elements */
                !props.isLoading &&
                <Home {...props}>
                    <Modal
                        open={true} // The modal should always be shown on page load, it is the 'page'
                        onClose={() => {
                            // get filteredFeatures and filteredClients if present in the url
                            const {["fltr-clients"]: fltrClients, ["fltr-features"]: fltrFeatures} = router.query;

                            // redirect to home page keeping the query params and the hash
                            router.push({
                                pathname: "/",
                                query: {
                                    ...(fltrClients && {fltrClients}),
                                    ...(fltrFeatures && {fltrFeatures}),
                                },
                                hash: `id-clt-${clientId}`,
                            });
                        }}
                    >
                        <DialogContent sx={style}>
                            <FeatureDetail clientId={clientId} featureName={featureName} pathname={router.pathname}/>
                        </DialogContent>
                    </Modal>
                </Home>
            }
        </>
    );
}

export default FeatureDetailPage;

