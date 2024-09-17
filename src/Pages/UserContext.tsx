import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextProps {
  username: string;
  userType: 'Maestro' | 'Mantenimiento';
  persona?: {
    idPersona: number;
    NombrePersonal: string;
    Ocupacion: string;
    ImagenPerfil: string;
  };
  setUsername: (username: string) => void;
  setUserType: (userType: 'Maestro' | 'Mantenimiento') => void;
  setPersona: (persona: {
    idPersona: number;
    NombrePersonal: string;
    Ocupacion: string;
    ImagenPerfil: string;
  }) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState<'Maestro' | 'Mantenimiento'>('Maestro');
  const [persona, setPersona] = useState<{
    idPersona: number;
    NombrePersonal: string;
    Ocupacion: string;
    ImagenPerfil: string;
  } | undefined>(undefined);

  return (
    <UserContext.Provider value={{ username, userType, persona, setUsername, setUserType, setPersona }}>
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