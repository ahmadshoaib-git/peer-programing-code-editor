import React from "react";
import { Suspense, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPrivateRoutes, getPublicRoutes } from "./routes.logic";
const RoutesProvider = () => {
  const publicRoutes = getPublicRoutes();
  const privateRoutes = getPrivateRoutes();
  return (
    <BrowserRouter>
      <Suspense fallback={<>Fallback</>}>
        <Routes>
          {publicRoutes}
          {privateRoutes}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesProvider;
