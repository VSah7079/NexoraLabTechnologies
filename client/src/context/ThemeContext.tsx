// src/context/ThemeContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // ✅ Force light theme only
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = document.documentElement;
    
    // ✅ Always remove dark class - force light theme
    root.classList.remove('dark');
    
    // ✅ Always set data-theme to light
    root.setAttribute('data-theme', 'light');
    
    // ✅ Save to localStorage
    localStorage.setItem('theme', 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: Theme) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Also export default for convenience
export default ThemeProvider;