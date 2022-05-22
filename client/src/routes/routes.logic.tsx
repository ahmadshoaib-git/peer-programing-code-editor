import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { PublicRoute, PrivateRoute } from "./RoutesList";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const PrivateRouteChecker = () => {
  const { loggedIn } = useSelector((state: RootState) => {
    return state.auth;
  });
  // const isAuth = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRouteChecker = () => {
  const { loggedIn } = useSelector((state: RootState) => {
    return state.auth;
  });
  // const isAuth = useAuth();
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

const basicPrivateRoutes = () => {
  return PrivateRoute.map((route, index) => {
    const Component = route.component;
    return (
      <Route key={index.toString()} path={route.path} element={<Component />} />
    );
  });
};

const getPrivateRoutes = () => {
  return (
    <Route element={<PrivateRouteChecker />}>{basicPrivateRoutes()}</Route>
  );
};

const BasicPublicRoutes = () => {
  return PublicRoute.map((route, index) => {
    const Component = route.component;
    return (
      <Route key={index.toString()} path={route.path} element={<Component />} />
    );
  });
};

const getPublicRoutes = () => {
  return <Route element={<PublicRouteChecker />}>{BasicPublicRoutes()}</Route>;
};

export { getPrivateRoutes, getPublicRoutes };
