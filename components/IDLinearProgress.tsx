import LinearProgress, {LinearProgressProps} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

/**
 * function IDLinearProgress
 * @param {LinearProgressProps} props
 * @constructor
 */
function IDLinearProgress(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
            <Box sx={{width: "100%", mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="caption" color="text.secondary">10/50</Typography>
            </Box>
        </Box>
    );
}

export default IDLinearProgress;
