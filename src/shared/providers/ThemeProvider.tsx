import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ColorScheme, getThemeColors } from '@theme/colors';

type ThemeContextType = ReturnType<typeof getThemeColors> & {
    colorScheme: ColorScheme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    const toggleTheme = () => {
        setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = {
        ...getThemeColors(colorScheme),
        colorScheme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
