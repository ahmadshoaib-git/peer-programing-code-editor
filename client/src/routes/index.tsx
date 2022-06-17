import React from "react";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { PageLoader } from "src/components";
import { BrowserRouter, Routes } from "react-router-dom";
import { getPrivateRoutes, getPublicRoutes } from "./routes.logic";
import { setLoggedIn } from "src/redux/slices/auth";
import { jwtInterceptor, responseInterceptor } from "src/utils/interceptors";
const RoutesProvider = () => {
  const publicRoutes = getPublicRoutes();
  const privateRoutes = getPrivateRoutes();
  const dispatch = useDispatch();
  React.useEffect(() => {
    jwtInterceptor();
    responseInterceptor(() => {
      dispatch(setLoggedIn({ loggedIn: false }));
      window.location.href = "/login";
    });
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {publicRoutes}
          {privateRoutes}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesProvider;
