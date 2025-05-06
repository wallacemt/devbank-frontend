import { Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { NotFound } from "./pages/NotFound";
import { DashBoard } from "./pages/DashBoard/DashBoard";
import { Loading } from "./components/Utils/Loading";
import { useUserContext } from "./hooks/useUserContext";

const PrivateRoutes = ({ children }: any) => {
  const { user, loading } = useUserContext();;

  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export const RoutesApp = () => {
  const { user, loading } = useUserContext();

  const privateRoutes = [
    { path: "/dashboard", element: <DashBoard /> },
  ];

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<PrivateRoutes>{route.element}</PrivateRoutes>} />
      ))}
    </Routes>
  );
};
