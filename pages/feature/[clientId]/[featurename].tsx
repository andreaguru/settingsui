import {useRouter} from "next/router";
import Modal from "@mui/material/Modal";
import FeatureDetail from "../../../components/FeatureDetail";
import Home from "../../index";
import {getFeaturesList} from "../../../utils/utils";
import Skeleton from "@mui/material/Skeleton";
import {HomeProps} from "../../../types/componentProps.types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Tooltip, Typography} from "@mui/material";
import IDAccordionList from "../../../components/IDAccordionList";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IDLinearProgress from "../../../components/IDLinearProgress";
import IDModalContent from "../../../components/IDModalContent";
import IDModalSidebar from "../../../components/IDModalSidebar";

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
                        }}
                    >
                        <IDModalContent container rowSpacing={3}>

                            {/* Header*/}
                            <Grid item xs={12}
                                sx={{position: "absolute",
                                    height: "80px",
                                    top: 0,
                                    width: "100%",
                                    bgcolor: "green"}}>
                                    Header...
                                <IconButton className="modalClose" onClick={() => router.push("/")}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>

                            {/* Table content*/}
                            <Grid item sx={{flexGrow: 1, p: 3}}>
                                <FeatureDetail
                                    clientId={clientId}
                                    featureName={featureName}
                                    pathname={router.pathname}/>
                            </Grid>

                            {/* Sidebar*/}
                            <IDModalSidebar item xs={4}>
                                <Container>
                                    <Typography variant="subtitle1">
                                            Konfigurationen
                                        <Tooltip title="Info tooltip">
                                            <HelpOutlineIcon style={{fontSize: "16px"}} />
                                        </Tooltip>
                                    </Typography>
                                    <IDLinearProgress value={80} />
                                </Container>
                                <IDAccordionList>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                    <div style={{height: "150px", width: "100%"}}>Accordion Placeholder</div>
                                </IDAccordionList>
                            </IDModalSidebar>
                        </IDModalContent>
                    </Modal>
                </Home>
            }
        </>
    );
}

export default FeatureDetailPage;

