import * as React from "react";
import {MouseEvent, useState} from "react";
import Popover from "@mui/material/Popover";
import Button, {ButtonProps} from "@mui/material/Button";
import Box from "@mui/material/Box";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {styled, useTheme} from "@mui/material/styles";

// import typescript Interfaces
import {IDInfoButtonProps} from "../types/componentProps.types";
import Image from "next/image";

// import custom Components
import iconColors from "../assets/icon_colors_icons.svg";
import colorsDiagram from "../assets/farben.png";
import drawDiagram from "../assets/ausspielung.png";
import drawExampleDiagram from "../assets/ausspielung_beispiel.png";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {alpha, Typography} from "@mui/material";
import IDAlert from "./IDAlert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const IDInfoBoxButton = styled(Button)<ButtonProps>(({theme}) => ({
    "marginTop": theme.spacing(3),
    "textTransform": "initial",
    "fontSize": theme.typography.pxToRem(14),
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
}));

/**
 * IDInfoButton component. It accepts 1 parameter:
 * align: alignment of the button
 *
 * @constructor
 */
function IDInfoButton({align}:IDInfoButtonProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();

    /**
     * Info Footer
     * @constructor
     */
    function IDInfoBoxFooter() {
        return (<Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <IDInfoBoxButton
                aria-describedby={id}
                variant="text"
                endIcon={<ArrowForwardIcon />}>weiter zu Farben & Icons</IDInfoBoxButton>
        </Box>);
    }

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
            <Button
                sx={{
                    position: "absolute",
                    top: "0",
                    textTransform: "initial",
                }}
                aria-describedby={id}
                variant="text"
                startIcon={<HelpOutlineIcon />}
                onClick={handleClick}>Hilfe</Button>
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
                <Paper elevation={0} square sx={{width: 188, maxWidth: "100%"}}>
                    <MenuList>
                        <MenuItem sx={{pl: theme.spacing(3)}}>
                            <ListItemIcon>
                                <Image alt="" layout="fixed" src={iconColors} width={20} height={20}/>
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{fontSize: theme.typography.pxToRem(14)}} >
                                Farben und Icons
                            </ListItemText>
                        </MenuItem>
                        <MenuItem sx={{pl: theme.spacing(3)}}>
                            <ListItemIcon>
                                <SyncAltIcon />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{fontSize: theme.typography.pxToRem(14)}} >
                                Ausspielung
                            </ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>

                {/* Header */}
                <Paper elevation={0} sx={{px: theme.spacing(3)}}>
                    <Button
                        sx={{marginTop: theme.spacing(2), p: 0, textTransform: "initial"}}
                        aria-describedby={id}
                        variant="text"
                        color="inherit"
                        startIcon={<ArrowBackIcon />}>Übersicht</Button>
                    <IconButton size="small" color="inherit" className="modalClose">
                        <CloseIcon />
                    </IconButton>
                </Paper>
                <Paper elevation={0} sx={{width: 509, maxWidth: "100%", p: theme.spacing(3), pt: 0}}>
                    <Typography
                        component="h1"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize={theme.typography.pxToRem(18)}
                        marginBottom={theme.spacing(2)}>
                        Farben und Icons
                    </Typography>
                    <Typography fontSize={theme.typography.pxToRem(14)} sx={{marginBottom: theme.spacing(4)}}>
                        <strong>Konfigurationen</strong> können auf&nbsp;
                        <strong>Mandanten, Kategorie</strong> oder <strong>Tag-Ebene</strong> vorgenommen werden.
                    </Typography>

                    <Box sx={{textAlign: "center"}}>
                        <Image alt="Farben und Icons" src={colorsDiagram} />
                    </Box>

                    <IDInfoBoxFooter />
                </Paper>

                <Paper elevation={0} sx={{width: 509, maxWidth: "100%", p: theme.spacing(3), pt: 0}}>
                    <Typography
                        component="h1"
                        textAlign="center"
                        fontWeight="medium"
                        fontSize={theme.typography.pxToRem(18)}
                        marginBottom={theme.spacing(2)}>
                        Ausspielung
                    </Typography>
                    <Typography fontSize={theme.typography.pxToRem(14)} sx={{marginBottom: theme.spacing(4)}}>
                        Konfigurationen werden <strong>direkt</strong> auf&nbsp;
                        <strong>Mandant, Kategorie</strong> oder <strong>Tag</strong> gesetzt.&nbsp;
                        Die <strong>Priorität</strong> der Ausspielung geht&nbsp;
                        <strong>von Tag</strong> über <strong>Kategorie</strong> zu <strong>Mandant</strong>.&nbsp;
                        Dabei wird mit <strong>Überschreiben</strong> und <strong>Übernehmen</strong> gearbeitet.
                    </Typography>

                    <Box sx={{textAlign: "center"}}>
                        <Image alt="Ausspielung" src={drawDiagram} />
                    </Box>

                    <IDAlert icon={<InfoOutlinedIcon sx={{fontSize: "medium"}} />} severity="info" sx={{marginY: 4}}>
                        <Typography variant="caption">
                            Mögliche Konfigurationen aus CUE auf dem Artikel überschreiben alles
                        </Typography>
                    </IDAlert>

                    <Typography fontSize={theme.typography.pxToRem(14)} sx={{marginBottom: theme.spacing(3)}}>
                        In der <strong>Übersicht der Mandanten</strong> sieht man einzig, <strong>wie</strong>&nbsp;
                        das <strong>Feature</strong> allgemein <strong>konfiguriert</strong> ist.&nbsp;
                        Möchte man herausfinden, <strong>welche Konfiguration</strong>&nbsp;
                        auf einem <strong>Artikel</strong> speziell <strong>ausgespielt</strong> wird,&nbsp;
                        so muss man sich die <strong>gesetzten Tags</strong>,&nbsp;
                        die jeweilige <strong>Kategorie</strong> und den <strong>Mandanten</strong> ansehen.
                        <br/><br/>
                        <strong>Artikel:</strong> &quot;Manuel Neuer kauft eine neues Haus&quot;
                    </Typography>

                    <Box sx={{textAlign: "center"}}>
                        <Image alt="Ausspielung Beispiel" src={drawExampleDiagram}/>
                    </Box>
                    <IDInfoBoxFooter />
                </Paper>
            </Popover>
        </Box>
    );
}

export default IDInfoButton;
