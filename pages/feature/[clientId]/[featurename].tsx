import {useRouter} from "next/router";
import Modal from "@mui/material/Modal";
import DialogContent from "@mui/material/DialogContent";
import FeatureDetail from "../../../components/FeatureDetail";
import Home from "../../index";
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

    return (
        <Home {...props}>
            <Modal
                open={true} // The modal should always be shown on page load, it is the 'page'
                onClose={() => router.push("/")}
            >
                <DialogContent sx={style}>
                    <FeatureDetail clientId={clientId} featureName={featureName} pathname={router.pathname}/>
                </DialogContent>
            </Modal>
        </Home>

    );
}

export default FeatureDetailPage;

