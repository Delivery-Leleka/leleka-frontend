import { Outlet } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import MessangerPage from "../messanger"; 

export default function HomeGuardLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Завантаження...</div>;
  }

  if (isAuthenticated) {
    return <MessangerPage />;
  }

  return <Outlet />;
}