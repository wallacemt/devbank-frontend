import { Routes, Route, Navigate } from "react-router";
import { Loading } from "./components/Utils/Loading";
import { useUserContext } from "./hooks/useUserContext";
import { Suspense, lazy } from "react";
import DepositConfirmationPage from "./pages/ConfirmDeposit";
import { CardsPage } from "./pages/CardsPage";
import ServerMaintence from "./pages/Errors/503";
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const NotFound = lazy(() => import("./pages/Errors/404"));
const HistoryTransfer = lazy(() => import("./pages/HistoryTransfer"));
const StashCaixinhaPage = lazy(() => import("./pages/StashsPage"));
const PrivateRoutes = ({ children }: any) => {
  const { user } = useUserContext();
  if (!user) return <Navigate to="/" />;
  return children;
};

export const RoutesApp = () => {
  const { user, loading, serverDown } = useUserContext();

  const privateRoutes = [
    { path: "/dashboard", element: <DashBoard /> },
    { path: "/history", element: <HistoryTransfer /> },
    { path: "/stashs", element: <StashCaixinhaPage /> },
    { path: "/stashs/new", element: <StashCaixinhaPage initialMode="create" /> },
    { path: "/deposit/:id", element: <DepositConfirmationPage /> },
    { path: "/cards", element: <CardsPage /> },
  ];

  if (loading) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={user ? <DashBoard /> : serverDown ? <ServerMaintence /> : <Login />} />
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/dashboard" /> : serverDown ? <ServerMaintence /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : serverDown ? <ServerMaintence /> : <Register />}
        />
        <Route path="/503" element={<ServerMaintence />} />
        <Route path="*" element={<NotFound />} />
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<PrivateRoutes>{route.element}</PrivateRoutes>} />
        ))}
      </Routes>
    </Suspense>
  );
};
