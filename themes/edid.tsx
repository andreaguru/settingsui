import {createTheme} from "@mui/material/styles";

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
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// create MUI Theme and assign custom style rules for each MUI component
export const edidTheme = createTheme({
    // Global variables used in theme and components
    variables: {
        headerMarginTop: "80px",
    },
    palette: {
        secondary: {
            main: "#EEEEEE",
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
    },
    components: {
        // Style the main container
        MuiContainer: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.component === "main" && {
                        backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
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
                }),
            },
        },
        // Style the Autcomplete
        MuiAutocomplete: {
            styleOverrides: {
                endAdornment: {
                    top: 0,
                },
            },
        },
        // Style the Info Button
        MuiButton: {
            styleOverrides: {
                root: {
                    position: "absolute",
                    top: "0",
                },
                text: {
                    textTransform: "initial",
                },
            },
        },
        // Style the Card (see MainContent.tsx)
        MuiCard: {
            styleOverrides: {
                root: {
                    margin: "20px 0",
                },
            },
        },
        // Style the Icon Button when is a div component (see MainContent.tsx)
        MuiIconButton: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    ...(ownerState.component === "div" && {
                        display: "flex",
                        margin: "10px 10px 10px 0",
                        padding: "10px",
                        borderRadius: "4px",
                        backgroundColor: theme.palette.secondary.main,
                    }),
                }),
            },
        },
    },
});
