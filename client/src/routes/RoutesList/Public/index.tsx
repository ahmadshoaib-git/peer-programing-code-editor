import React from "react";

const PublicRoutes = [
  {
    path: "/signup",
    title: "Codepeer | Signup",
    component: React.lazy(() => import("src/pages/Login")),
  },
  {
    path: "/login",
    title: "Codepeer | Login",
    component: React.lazy(() => import("src/pages/Login")),
  },
];

export default PublicRoutes;
