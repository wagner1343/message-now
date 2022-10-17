import React from "react";
import applicationTheme from "src/theme/applicationTheme";
import {ThemeProvider} from "@mui/material";

function AppThemeProvider({children}) {
    return (
        <ThemeProvider theme={applicationTheme}>
            {children}
        </ThemeProvider>
    );
}

export default AppThemeProvider;