import { createTheme, lighten, alpha } from "@mui/material/styles";

// import CategoryIcon from "@mui/icons-material/AccountTree";
// import TagIcon from "@mui/icons-material/LocalOffer";

const IDBlue = "#1976d2";
const IDGreen = "#319e7d";
const IDOrange = "#fdad0d";
const IDRed = "#f15653";
const IDDarkGray = "#212121";
const IDMediumGray = "#616161";
const IDLightGray = "#a5a5a5";

// create MUI Theme and assign custom style rules for each MUI component
const edidTheme = createTheme({
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
    typography: theme => ({
        body1: {
            color: theme.secondary.main, // Replace with your desired text color
        },
    }),
    // Create a new 'custom' field
    custom: {
        clientCardHeight: 70, // height of the ClientCard Element
    },
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
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.className === "readOnly" && {
                        color: theme.palette.id_lightGray.main,
                        "& .MuiFormLabel-root": {
                            color: theme.palette.id_lightGray.main,
                        },
                        "& .MuiInputBase-root": {
                            color: theme.palette.id_lightGray.main,
                        },
                    }),
                }),
            },
        },
        // Style the Skeleton, used as loader
        MuiSkeleton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    margin: `0 0 ${theme.spacing(4)}`,
                }),
            },
        },
        // Style the main container (present in index.tsx)
        MuiContainer: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
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
                root: ({ theme }) => ({
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundColor: theme.palette.secondary.main,
                }),
            },
        },
        // Style the Sidebar Title
        MuiToolbar: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.className === "toolbarTitle" && {
                        fontSize: theme.typography.pxToRem(30),
                        paddingTop: theme.spacing(3),
                        paddingBottom: theme.spacing(3),
                    }),
                    ...(ownerState.className === "mainToolbar" && {
                        [theme.breakpoints.up("sm")]: {
                            minHeight: theme.spacing(9),
                        },
                        "& .MuiList-root": {
                            lineHeight: theme.spacing(0),
                        },
                    }),
                }),
            },
        },
        // Style the Sidebar
        MuiDrawer: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    position: "relative",
                    width: theme.spacing(41),
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2),
                }),
            },
        },
        // Style the Autcomplete
        MuiAutocomplete: {
            styleOverrides: {
                root: ({ theme }) => ({
                    marginBottom: theme.spacing(4),
                }),
                endAdornment: {
                    top: 0,
                },
                input: {
                    flexBasis: "100%",
                },
            },
        },
    },
});

export default edidTheme;
