import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  rol: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  createUser: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  updateUser: (id: string, userData: Partial<User>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  createUser: async () => false,
  updateUser: async () => false,
  deleteUser: async () => false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    }
  }, []);

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      return true;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return false;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      return true;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return false;
    }
  };

  // 🆕 Función para crear usuario
  const createUser = async (userData: Omit<User, "id"> & { password: string }) => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error al crear usuario");

      return true;
    } catch (error) {
      console.error("Error en createUser:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
