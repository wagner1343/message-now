// React
import React from "react";
import { Redirect } from "react-router";

// Local
import useAuth from "src/hooks/auth/useAuth";
import { parseQuery } from "src/utils/parseQuery";

function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const { redirect } = parseQuery(window.location.search);

  console.log("guest guard", isAuthenticated);
  if (isAuthenticated) {
      return <Redirect to={`/`} />;
  }

  return children;
}

export default GuestGuard;
