// import Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import context and theme
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { ReactElement } from "react";
import { SWRConfig } from "swr";
import { AppContextProvider } from "context/AppContext";

// import typescript Interfaces
import { IDAppProps } from "types/componentProps.types";

// import utils
import edidTheme from "../themes/edid";

/**
 *
 * @constructor
 */
function TemplatePage({ Component }: IDAppProps): ReactElement {
    return (
        <AppContextProvider>
            {/* We wrap the app into SWR Config in order to have everywhere
            access to SWR cache informations */}
            <SWRConfig value={{ provider: () => (new Map) }}>
                <ThemeProvider theme={edidTheme}>
                    <Head>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Component />
                </ThemeProvider>
            </SWRConfig>
        </AppContextProvider>
    );
}

export default TemplatePage;
