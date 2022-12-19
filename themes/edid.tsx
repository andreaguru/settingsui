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
}

// create MUI Theme and assign custom style rules for each MUI component
export const edidTheme = createTheme({
    // Global variables used in theme and components
    variables: {
        headerMarginTop: "80px",
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
    },
});
