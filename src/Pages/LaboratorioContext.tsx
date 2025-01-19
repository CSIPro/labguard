import React, { createContext, useState, ReactNode, useContext } from 'react';

interface LaboratorioContextType {
  laboratorioId: string | null;
  setLaboratorioId: (id: string) => void;
}

const LaboratorioContext = createContext<LaboratorioContextType | undefined>(undefined);

interface LaboratorioProviderProps {
  children: ReactNode;
}

export const LaboratorioProvider = ({ children }: LaboratorioProviderProps) => {
  const [laboratorioId, setLaboratorioId] = useState<string | null>(null);

  return (
    <LaboratorioContext.Provider value={{ laboratorioId, setLaboratorioId }}>
      {children}
    </LaboratorioContext.Provider>
  );
};

export const useLaboratorio = (): LaboratorioContextType => {
  const context = useContext(LaboratorioContext);
  if (!context) {
    throw new Error('useLaboratorio debe ser usado dentro de un LaboratorioProvider');
  }
  return context;
};