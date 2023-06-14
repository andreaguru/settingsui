import LinearProgress, {linearProgressClasses, LinearProgressProps} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const IDStyleLinearProgress = styled(LinearProgress)(({theme}) => ({
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.secondary.light,
    },
}));

/**
 * function IDLinearProgress
 * @param {LinearProgressProps} props
 * @constructor
 */
function IDLinearProgress(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{display: "flex", flexWrap: "wrap"}}>
            <Box sx={{width: "100%"}}>
                <Typography variant="caption" component="p" color="text.secondary" textAlign="right" marginBottom={1}>
                    10 Konfigurationen angelegt
                </Typography>
                <IDStyleLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: "5px", marginTop: 1}}>
                <Box
                    sx={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "1px",
                        backgroundColor: "primary.main",
                    }}
                />
                <Typography variant="caption" component="span" color="text.secondary">verwendet</Typography>
                <Box
                    sx={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "1px",
                        backgroundColor: "secondary.light",
                    }}
                />
                <Typography variant="caption" component="span" color="text.secondary">nicht verwendet</Typography>
            </Box>
        </Box>
    );
}

export default IDLinearProgress;
