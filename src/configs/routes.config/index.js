import React from "react";
import authRoute from "./authRoute";
import { ROUTE_LIST } from "./route";

export const publicRoutes = [...authRoute];

const BaseRoute = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("views/Home")),
    authority: [],
  },
];

export const protectedRoutes = [...BaseRoute, ...ROUTE_LIST];
