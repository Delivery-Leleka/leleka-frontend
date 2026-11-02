import { createContext, useContext, useState, type ReactNode } from 'react';

export interface LayoutContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selected: any;
  setSelected: (val: any) => void;
  query: string;
  setQuery: (val: string) => void;
  myProfilePop: boolean;
  setMyProfilePop: (val: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [myProfilePop, setMyProfilePop] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        selected,
        setSelected,
        query,
        setQuery,
        myProfilePop,
        setMyProfilePop,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return ctx;
}
