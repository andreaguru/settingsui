import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

function IDLoader() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                inset: 0,
            }}
        >
            <CircularProgress />
        </Box>
    );
}

export default IDLoader;
