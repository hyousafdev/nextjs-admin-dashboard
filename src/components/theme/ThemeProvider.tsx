"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY } from "@/lib/theme";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

function getStoredTheme(): Theme {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (value === "light" || value === "dark" || value === "system") {
      return value;
    }
  } catch {
    // Storage can be blocked (for example in private mode).
  }

  return "system";
}

function getSystemDark(): boolean {
  return window.matchMedia(DARK_QUERY).matches;
}

// Writes the "dark" class directly on <html>. It is not done in an effect,
// so the page never flashes the wrong theme during hydration.
function applyTheme(theme: Theme) {
  const isDark = theme === "dark" || (theme === "system" && getSystemDark());

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function subscribeToSystem(callback: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

const getServerTheme = (): Theme => "system";
const getServerSystemDark = () => false;

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme,
  );
  const systemDark = useSyncExternalStore(
    subscribeToSystem,
    getSystemDark,
    getServerSystemDark,
  );

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemDark ? "dark" : "light") : theme;

  // Keep the page in sync when the OS theme changes (while "system" is
  // selected) or when the theme is changed in another tab.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);

    function handleChange() {
      applyTheme(getStoredTheme());
    }

    media.addEventListener("change", handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The theme still changes for this session.
    }

    applyTheme(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider.");
  }

  return context;
}