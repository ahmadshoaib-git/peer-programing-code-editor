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
    path: "/Editor",
    title: "Codepeer | Editor",
    component: React.lazy(() => import("src/pages/Editor")),
  },
];

export default PrivateRoutes;
