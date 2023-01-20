import {createTheme} from "@mui/material/styles";

/* We need to enhance the Theme and Palette Interfaces in order to add new custom values
(in our case variables, neutral and lightGrey).
The Interfaces are declared in node_modules/@mui/material/styles/createTheme.d.ts and
node_modules/@mui/material/styles/createPalette.d.ts */
declare module "@mui/material/styles" {
  interface Theme {
    variables: {
       headerMarginTop: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    variables?: {
        headerMarginTop: string;
    };
  }
  interface Palette {
    neutral: Palette["primary"];
    lightGrey: Palette["primary"];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    lightGrey?: PaletteOptions["primary"];
  }
}

// create MUI Theme and assign custom style rules for each MUI component
export const edidTheme = createTheme({
    // Global variables used in theme and components
    variables: {
        headerMarginTop: "64px",
    },
    palette: {
        primary: {
            main: "#1976D2",
        },
        secondary: {
            main: "#212121",
        },
        success: {
            main: "#52A959",
        },
        error: {
            main: "#DB504A",
        },
        neutral: {
            main: "#A5A5A5",
        },
        lightGrey: {
            main: "#EEEEEE",
        },
    },
    components: {
        // Style the main container
        MuiContainer: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.component === "main" && {
                        backgroundColor: theme.palette.mode === "light" ?
                            theme.palette.grey[100] :
                            theme.palette.grey[900],
                        flexGrow: 1,
                        position: "relative",
                        height: `calc(100vh - ${theme.variables.headerMarginTop})`,
                        overflow: "auto",
                        paddingTop: 10,
                        paddingBottom: 10,
                    }),
                }),
            },
        },
        // Style the AppBar
        MuiAppBar: {
            styleOverrides: {
                root: ({theme}) => ({
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: theme.palette.secondary.main,
                }),
            },
        },
        // Style the Filter Icon
        MuiToolbar: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.className === "filterIcon" && {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        [theme.breakpoints.up("md")]: {
                            paddingLeft: 0,
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
                text: {
                    textTransform: "initial",
                },
            },
        },
        // Style the Card (see MainContent.tsx)
        MuiCard: {
            styleOverrides: {
                root: {
                    margin: "30px 0",
                },
            },
        },
        // Style the Icon Button when is a div component (see MainContent.tsx)
        MuiIconButton: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.classNAme === "div" && {
                        display: "flex",
                        margin: "10px 10px 10px 0",
                        padding: "8px",
                        borderRadius: "4px",
                        gap: "8px",
                        backgroundColor: theme.palette.lightGrey.main,
                        color: theme.palette.secondary.main,
                    }),
                }),
            },
        },
    },
});
