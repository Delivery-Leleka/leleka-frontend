import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/hooks/useAuth";

export default function GuestLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Завантаження...</div>;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}