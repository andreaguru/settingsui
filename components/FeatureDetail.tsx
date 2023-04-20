import Box from "@mui/material/Box";
import React, {forwardRef} from "react";

interface FeatureDetail {
   clientId: string;
   featureName: string;
   pathname: string;
}

const FeatureDetail = forwardRef<unknown, FeatureDetail>(({clientId, featureName, pathname}, ref) => (
    <Box ref={ref}>
            Client Id: {clientId} <br/>
            I am the feature <strong>{featureName}</strong><br/>
            my pathname is: {pathname}
    </Box>
));

FeatureDetail.displayName = "FeatureDetail";

export default FeatureDetail;
