import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "src/routes";
import AppThemeProvider from "src/ui/components/theme/ThemeProvider";


function App() {
    return (
        <BrowserRouter>
            <AppThemeProvider>
                <AppRoutes/>
            </AppThemeProvider>
        </BrowserRouter>
    );
}

export default App;
