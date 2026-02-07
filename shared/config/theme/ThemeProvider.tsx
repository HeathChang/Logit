"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "logit-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light");

    const applyTheme = useCallback((nextTheme: Theme) => {
        setThemeState(nextTheme);

        if (typeof document !== "undefined") {
            document.body.setAttribute("data-mode", nextTheme);
        }

        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, nextTheme);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
        const prefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initialTheme: Theme = stored ?? (prefersDark ? "dark" : "light");
        applyTheme(initialTheme);
    }, [applyTheme]);

    const toggleTheme = useCallback(() => {
        applyTheme(theme === "dark" ? "light" : "dark");
    }, [applyTheme, theme]);

    const value: ThemeContextValue = {
        theme,
        toggleTheme,
        setTheme: applyTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}

