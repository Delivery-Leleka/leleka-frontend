import { useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

// Поки тут замокані данні та можна самостійно поставити, авторизований юзер чи ні. 
// Коли буде готова авторизація на бекенді - сюди треба буде підключити

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // щоб зробити юзера авторизованим, треба зробити значення true
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  /*
  {
    id: "1",
    email: "user@leleka.com",
    name: "Тестовий Користувач",
  }*/

  const login = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({
        id: "1",
        email: "user@leleka.com",
        name: "Тестовий Користувач",
      });
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };
};