import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextProps {
  username: string;
  userType: 'Maestro' | 'Mantenimiento';
  setUsername: (username: string) => void;
  setUserType: (userType: 'Maestro' | 'Mantenimiento') => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState<'Maestro' | 'Mantenimiento'>('Maestro');

  return (
    <UserContext.Provider value={{ username, userType, setUsername, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('No se encuentra un usuario');
  }
  return context;
};
