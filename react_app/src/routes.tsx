import React, {Component, ElementType, Fragment, lazy, Suspense} from "react";

import {Redirect, Route, Switch} from "react-router-dom";

import LoadingScreen from "src/ui/components/LoadingScreen";
import AuthGuard from "src/ui/components/guards/AuthGuard";
import GuestGuard from "src/ui/components/guards/GuestGuard";
import MainLayout from "src/ui/layouts/MainLayout";
import * as Path from "path";
import UserLayout from "src/ui/layouts/UserLayout";

const routesConfig: RouteDefinition[] = [
    {
        path: "/",
        layout: MainLayout,
        children: [

            {
                path: "/login",
                guard: GuestGuard,
                element: lazy(() => import("src/ui/pages/LoginPage"))
            },
            {
                path: "/",
                guard: AuthGuard,
                layout: UserLayout,
                children: [
                    {
                        path: "/",
                        element: lazy(() => import("src/ui/pages/Home"))
                    },
                ]
            },
            {
                path: "/404",
                element: lazy(() => import("src/ui/pages/error/NotFound"))
            },
            {
                path: "*",
                element: () => <Redirect to={"/404"}/>
            }
        ]
    },
];

export interface RouteDefinition {
    children?: RouteDefinition[];
    element?: ElementType | null;
    guard?: ElementType | null;
    layout?: ElementType | null;
    path: string;
}

const renderRoutes = (routes: RouteDefinition[]) =>
    routes ? (
        <Suspense fallback={<LoadingScreen/>}>
            <Switch>
                {routes.map((route, i) => {
                    const {guard, layout, element, children, path} = route;
                    const Guard = guard || Fragment;
                    const Layout = layout || Fragment;
                    const Component = element || Fragment;
                    const Element = (props) => (
                        <Guard>
                            <Layout>
                                {children ? (
                                    renderRoutes(children)
                                ) : (
                                    <Component {...props} />
                                )}
                            </Layout>
                        </Guard>
                    );
                    return (
                        <Route
                            key={i}
                            path={path}
                            exact={!children}
                            render={Element}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    ) : null;

function AppRoutes() {
    return renderRoutes(routesConfig);
}

export default AppRoutes;
