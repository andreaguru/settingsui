import {MouseEvent} from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {IDInfoButtonProps} from "../types/componentProps.types";

/**
 * IDInfoButton component. It accepts 1 parameter:
 * align: alignment of the button
 *
 * @constructor
 */
function IDInfoButton({align}:IDInfoButtonProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Box sx={{
            display: "flex",
            justifyContent: align,
        }}>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>Outlined</Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Typography sx={{p: 2}}>The content of the Popover.</Typography>
            </Popover>
        </Box>
    );
}

export default IDInfoButton;
