import { useAppConfig } from '@/hooks/useStoredState';
import React, { createContext, useContext } from 'react';
import { Colors } from '../constants/theme';


const ThemeContext = createContext({
  isDarkMode: false,
  colors: Colors.light,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useAppConfig();
  const colors = config.darkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode: config.darkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);