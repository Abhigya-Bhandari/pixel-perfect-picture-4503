import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Concern } from './data';
export type SkinSession = { image: string; concern: Concern; isDemo: boolean };
const SkinContext = createContext<{session: SkinSession | null; setSession: (value: SkinSession | null) => void} | null>(null);
export function SkinProvider({children}: {children: ReactNode}) {
  const [session, setSession] = useState<SkinSession | null>(null);
  return <SkinContext.Provider value={{session, setSession}}>{children}</SkinContext.Provider>;
}
export function useSkin() { const value = useContext(SkinContext); if (!value) throw new Error('SkinProvider is required'); return value; }
