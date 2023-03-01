import Box from "@mui/material/Box";
import React, {forwardRef} from "react";

interface FeatureDetail {
   id: string;
   featureName: string;
   pathname: string;
}

const FeatureDetail = forwardRef<unknown, FeatureDetail>(({id, featureName, pathname}, ref) => (
    <Box ref={ref}>
            Client Id: {id} <br/>
            I am the feature {featureName}; my pathname is: {pathname}
    </Box>
));

FeatureDetail.displayName = "FeatureDetail";

export default FeatureDetail;
