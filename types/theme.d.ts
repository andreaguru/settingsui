// src/theme/theme.d.ts
import "@mui/material/styles";

/* We need to enhance the Theme and Palette Interfaces in order to add new custom values
The Interfaces are declared in node_modules/@mui/material/styles/createTheme.d.ts and
node_modules/@mui/material/styles/createPalette.d.ts */
// Extend the Theme interface
declare module "@mui/material/styles" {
    interface Theme {
        custom: {
            clientCardHeight: number
        }
    }

    // Allow configuration using `createTheme`
    interface ThemeOptions {
        custom?: {
            clientCardHeight?: number
        }
    }

    interface Palette {
        id_green: Palette["primary"]
        id_orange: Palette["primary"]
        id_red: Palette["primary"]
        id_lightGray: Palette["primary"]
        id_mediumGray: Palette["primary"]
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        id_green: PaletteOptions["primary"]
        id_orange: PaletteOptions["primary"]
        id_red: PaletteOptions["primary"]
        id_lightGray?: PaletteOptions["primary"]
        id_mediumGray?: PaletteOptions["primary"]
    }
}

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
        id_green: true
        id_orange: true
        id_red: true
        id_lightGray: true
        id_mediumGray: true
    }
}
