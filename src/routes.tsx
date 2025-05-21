import { Routes, Route, Navigate } from "react-router";

import { Loading } from "./components/Utils/Loading";
import { useUserContext } from "./hooks/useUserContext";
import { Suspense, lazy } from "react";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const NotFound = lazy(() => import("./pages/Errors/404"));

const PrivateRoutes = ({ children }: any) => {
  const { user } = useUserContext();
  if (!user) return <Navigate to="/" />;
  return children;
};

export const RoutesApp = () => {
  const { user, loading } = useUserContext();

  const privateRoutes = [{ path: "/dashboard", element: <DashBoard /> }];

  if (loading) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={user ? <DashBoard /> : <Login />} />
        <Route path="/sign-in" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="*" element={<NotFound />} />
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<PrivateRoutes>{route.element}</PrivateRoutes>} />
        ))}
      </Routes>
    </Suspense>
  );
};
