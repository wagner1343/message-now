// React
import React from "react";
import {Redirect} from "react-router";

// Local
import useAuth from "src/hooks/auth/useAuth";

function AuthGuard({children}) {
    const {isAuthenticated} = useAuth();
    const targetRedirect = window.location;

    if (!isAuthenticated) {
        return <Redirect to={`/login?&redirect=${targetRedirect}`}/>;
    }

    return children;
}

export default AuthGuard;
