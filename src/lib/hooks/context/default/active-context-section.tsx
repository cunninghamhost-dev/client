'use client';
import { TSectionName } from '@/types/default.type';
import React, { useState, createContext } from 'react';

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type TActiveSectionContext = {
  activeSection: TSectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<TSectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext = createContext<TActiveSectionContext | null>(null);

export default function ActiveSectionContextProvider({ children }: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<TSectionName>('Home');
  const [timeOfLastClick, setTimeOfLastClick] = useState<number>(0);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}
