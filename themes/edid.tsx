import {createTheme} from "@mui/material/styles";
import {lighten} from "@mui/system/colorManipulator";
import {alpha} from "@mui/material";

/* We need to enhance the Theme and Palette Interfaces in order to add new custom values
The Interfaces are declared in node_modules/@mui/material/styles/createTheme.d.ts and
node_modules/@mui/material/styles/createPalette.d.ts */
declare module "@mui/material/styles" {
    interface Palette {
        id_green: Palette["primary"];
        id_orange: Palette["primary"];
        id_red: Palette["primary"];
        id_lightGray: Palette["primary"];
        id_mediumGray: Palette["primary"];
    }
    // allow configuration using `createTheme`
    interface PaletteOptions {
        id_green: PaletteOptions["primary"];
        id_orange: PaletteOptions["primary"];
        id_red: PaletteOptions["primary"];
        id_lightGray?: PaletteOptions["primary"];
        id_mediumGray?: PaletteOptions["primary"];
    }
}
// import CategoryIcon from "@mui/icons-material/AccountTree";
// import TagIcon from "@mui/icons-material/LocalOffer";

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
        id_green: true;
        id_orange: true;
        id_red: true;
        id_lightGray: true;
        id_mediumGray: true;
    }
}

const IDBlue = "#1976d2";
const IDGreen = "#319e7d";
const IDOrange = "#fdad0d";
const IDRed = "#f15653";
const IDDarkGray = "#212121";
const IDMediumGray = "#616161";
const IDLightGray = "#a5a5a5";

// create MUI Theme and assign custom style rules for each MUI component
export const edidTheme = createTheme({
    palette: {
        // Default MUI colors (just use primary + secondary)
        primary: {
            main: IDBlue,
            light: lighten(IDBlue, 0.88),
        },
        secondary: {
            main: IDDarkGray,
            light: alpha(IDDarkGray, 0.6),
        },
        success: {
            main: IDGreen,
            light: lighten(IDGreen, 0.88),
        },
        warning: {
            main: IDOrange,
        },
        error: {
            main: IDRed,
            light: lighten(IDRed, 0.88),
        },

        // ID color palette
        id_green: {
            main: IDGreen,
            light: lighten(IDGreen, 0.88),
        },
        id_orange: {
            main: IDOrange,
        },
        id_red: {
            main: IDRed,
            light: lighten(IDRed, 0.88),
        },
        id_mediumGray: {
            main: IDMediumGray,
            light: lighten(IDMediumGray, 0.86),
        },
        id_lightGray: {
            main: IDLightGray,
        },
    },
    typography: (theme) => ({
        body1: {
            color: theme.secondary.main, // Replace with your desired text color
        },
    }),
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*::-webkit-scrollbar": {
                    width: "0.3em",
                    backgroundColor: "#f5f5f5",
                },
                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                    borderRight: "1px solid white",
                },
            },
        },
        // Style the Skeleton, used as loader
        MuiSkeleton: {
            styleOverrides: {
                root: ({theme}) => ({
                    margin: `0 0 ${theme.spacing(4)}`,
                }),
            },
        },
        // Style the main container (present in index.tsx)
        MuiContainer: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.className === "mainContent" && {
                        backgroundColor: theme.palette.grey[100],
                        flexGrow: 1,
                        position: "relative",
                        height: `calc(100vh - ${theme.spacing(8)})`,
                        overflow: "auto",
                        paddingTop: theme.spacing(3),
                    }),
                }),
            },
        },
        // Style the AppBar (the header of our App)
        MuiAppBar: {
            styleOverrides: {
                root: ({theme}) => ({
                    zIndex: theme.zIndex.drawer + 1,
                }),
            },
        },
        // Style the Sidebar Title
        MuiToolbar: {
            styleOverrides: {
                root: ({theme, ownerState}) => ({
                    ...(ownerState.className === "toolbarTitle" && {
                        fontSize: "30px",
                        paddingTop: theme.spacing((3)),
                        paddingBottom: theme.spacing((3)),
                        [theme.breakpoints.up("sm")]: {
                            minHeight: "44px",
                        },
                    }),
                }),
            },
        },
        // Style the Sidebar
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    position: "relative",
                    width: 300,
                    padding: "0 15px",
                },
            },
        },
        // Style the Autcomplete
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    marginBottom: "30px",
                },
                endAdornment: {
                    top: 0,
                },
                input: {
                    flexBasis: "100%",
                },
            },
        },
        // Style the Card content (see MainContent.tsx)
        MuiCardContent: {
            styleOverrides: {
                root: ({theme}) => ({
                    padding: theme.spacing(3),
                }),
            },
        },
        // Style the Icon Buttons
        MuiIconButton: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    color: theme.palette.secondary.main,
                    ...(ownerState.className === "iconStatus" && {
                        "display": "flex",
                        "marginTop": theme.spacing(2),
                        "marginRight": theme.spacing(2),
                        "padding": theme.spacing(1) + " " + theme.spacing(2),
                        "borderRadius": theme.spacing(.5),
                        "gap": theme.spacing(1),
                        "&:hover": {
                            boxShadow: "0 3px 3px rgb(0 0 0 / 12%)",
                        },
                    }),
                    // Style the Modal close button (in featurename page)
                    ...(ownerState.className === "modalClose" && {
                        position: "absolute",
                        top: theme.spacing(3),
                        right: theme.spacing(3),
                        padding: 0,
                    }),
                }),
            },
        },
    },
});
