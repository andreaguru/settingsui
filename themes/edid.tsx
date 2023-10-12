import {createTheme} from "@mui/material/styles";
import {lighten} from "@mui/system/colorManipulator";
import {alpha} from "@mui/material";

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
            main: "#1976d2",
            dark: "red",
        },
        secondary: {
            main: "#212121",
            light: alpha("#212121", 0.6),
        },
        success: {
            main: "#319e7d",
            light: lighten("#319e7d", 0.88),
        },
        warning: {
            main: "#fdad0d",
        },
        error: {
            main: "#f15653",
        },
        neutral: {
            main: "#616161",
            light: lighten("#616161", 0.86),
        },
        disabled: {
            main: "#a5a5a5",
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
        // Style the Outlined Text Input fields (see IDToggle.tsx)
        MuiOutlinedInput: {
            styleOverrides: {
                input: ({theme}) => ({
                    "&.Mui-disabled": {
                        all: "unset",
                        color: theme.palette.secondary.main,
                        fontSize: theme.typography.body2.fontSize,
                        width: "100%",
                    },
                }),
                notchedOutline: {
                    display: "none",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({theme}) => ({
                    "&.Mui-disabled": {
                        all: "unset",
                        color: theme.palette.secondary.light,
                        fontSize: theme.typography.caption.fontSize,
                    },
                }),
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: ({theme}) => ({
                    "&.Mui-disabled": {
                        fontSize: theme.typography.caption.fontSize,
                    },
                }),
            },
        },
    },
});
