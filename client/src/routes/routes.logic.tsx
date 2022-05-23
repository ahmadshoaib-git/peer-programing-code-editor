import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { PublicRoute, PrivateRoute } from "./RoutesList";

const useAuth = () => {
  const { loggedIn } = useSelector((state: RootState) => {
    return state.auth;
  });
  return loggedIn || localStorage.getItem("token");
};

const PrivateRouteChecker = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRouteChecker = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
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
