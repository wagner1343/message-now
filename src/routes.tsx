import React, { Fragment, lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import LoadingScreen from "src/ui/components/LoadingScreen";
import LoginPage from "src/ui/pages/LoginPage";

const routesConfig = [
  {
    exact: true,
    path: "/login",
    component:  LoginPage,
  },
  {
    exact: true,
    path: "/",
    component: lazy(() => import("src/ui/pages/Home")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/ui/pages/error/NotFound")),
  },
  {
    exact: true,
    path: "*",
    component: () => <Navigate to={"/"} />,
  },
];

const renderRoutes = (routes) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Routes>
    </Suspense>
  ) : null;

function AppRoutes() {
  return renderRoutes(routesConfig);
}

export default AppRoutes;
