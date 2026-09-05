import { useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

//Поки тут замокані данні та можна самотно поставити, авторизований юзер чи ні. Коли буде готова авторизація на юекенді - сюди треба буде підключити

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // щоб зробити юзера автризваним, треба зробити значення true
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(
    {
    id: "1",
    email: "user@leleka.com",
    name: "Тестовий Користувач",
}
  );
  // треба додати юзера. Наприклад:
  /*
  {
    id: "1",
    email: "user@leleka.com",
    name: "Тестовий Користувач",
}
  */
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