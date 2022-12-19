import {createTheme} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Variables used in the theme
const headerHeight = "80px";

// create MUI Theme and assign custom style rules for each MUI component
export const edidTheme = createTheme({
    palette: {
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
                        height: `calc(100vh - ${headerHeight})`,
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
    },
});
