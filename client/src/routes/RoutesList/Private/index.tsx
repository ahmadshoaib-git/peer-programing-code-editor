import React from "react";

const PrivateRoutes = [
  {
    path: "/",
    title: "Codepeer | Home",
    component: React.lazy(() => import("src/pages/Home")),
  },
  {
    path: "/home",
    title: "Codepeer | Home",
    component: React.lazy(() => import("src/pages/Home")),
  },
  {
    path: "/editor/:id",
    title: "Codepeer | Editor",
    component: React.lazy(() => import("src/pages/Editor")),
  },
  {
    path: "*",
    title: "Codepeer | Page not found",
    component: React.lazy(() => import("src/pages/NotFound")),
  },
];

export default PrivateRoutes;
