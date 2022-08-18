// React
import React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

// Local
import useAuth from "src/context/hooks/auth/useAuth";

function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const { organizationId } = useParams();
  const targetRedirect = window.location;

  if (!isAuthenticated) {
    return <Redirect to={`/${organizationId}/entrar?&redirect=${targetRedirect}`} />;
  }

  return children;
}

export default AuthGuard;
