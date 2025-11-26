import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Theme, lightTheme, darkTheme } from '../types/theme';


interface ThemeContextProps {
    theme: Theme;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    isDarkMode: false,
    toggleDarkMode: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Load preference from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('procrastiNotDarkMode');
        if (stored !== null) {
            setIsDarkMode(stored === 'true');
        }
    }, []);

    // Persist changes
    useEffect(() => {
        localStorage.setItem('procrastiNotDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
