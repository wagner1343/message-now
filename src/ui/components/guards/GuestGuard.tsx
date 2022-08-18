// React
import React from "react";
import { Redirect, useParams } from "react-router";

// Local
import useAuth from "src/context/hooks/auth/useAuth";
import { parseQuery } from "src/utils/queryString";

function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const { organizationId } = useParams();
  const { redirect } = parseQuery(window.location.search);

  if (isAuthenticated) {
    if (redirect) {
      window.location.href = redirect;
      return <></>;
    } else {
      return <Redirect to={`/${organizationId}`} />;
    }

  }

  return children;
}

export default GuestGuard;
