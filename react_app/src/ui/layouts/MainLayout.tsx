import React from 'react';
import useInitialize from "src/hooks/useInitialize";

function MainLayout({children}) {
    const {isInitializing} = useInitialize();

    if(isInitializing) {
        return null;
    }
    return children;
}

export default MainLayout;