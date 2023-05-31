import {createTheme} from "@mui/material/styles";
import {lighten} from "@mui/system/colorManipulator";

/* We need to enhance the Theme and Palette Interfaces in order to add new custom values
(in our case variables, disabled).
The Interfaces are declared in node_modules/@mui/material/styles/createTheme.d.ts and
node_modules/@mui/material/styles/createPalette.d.ts */
declare module "@mui/material/styles" {
  interface Palette {
    disabled: Palette["primary"];
    neutral: Palette["primary"];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    disabled?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
  }
}

// create MUI Theme and assign custom style rules for each MUI component
export const edidTheme = createTheme({
    palette: {
        primary: {
            main: "#1976D2",
        },
        secondary: {
            main: "#212121",
        },
        success: {
            main: "#319E7D",
            light: lighten("#319E7D", 0.88),
        },
        warning: {
            main: "#FDAD0D",
        },
        error: {
            main: "#F15653",
        },
        neutral: {
            main: "#616161",
            light: lighten("#616161", 0.86),
        },
        disabled: {
            main: "#A5A5A5",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*::-webkit-scrollbar": {
                    width: "0.3em",
                    backgroundColor: "#F5F5F5",
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
        // Style the Info Button
        MuiButton: {
            styleOverrides: {
                text: ({ownerState}) => ({
                    ...(ownerState.className === "infoButton" && {
                        textTransform: "initial",
                    }),
                }),
            },
        },
        // Style the Client Card (see ClientCard.tsx)
        MuiCard: {
            styleOverrides: {
                root: ({theme}) => ({
                    margin: theme.variables.mainContentElementsMargin,
                    minHeight: "180px",
                }),
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
                    ...(ownerState.className === "iconStatus" && {
                        display: "flex",
                        marginTop: theme.spacing(2),
                        marginRight: theme.spacing(2),
                        padding: theme.spacing(1) + " " + theme.spacing(2),
                        borderRadius: theme.spacing(.5),
                        gap: theme.spacing(1),
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
