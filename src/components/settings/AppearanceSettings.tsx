"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { Theme } from "@/components/theme/ThemeProvider";

const options: {
  value: Theme;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Bright and clean",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Match your device",
    icon: Monitor,
  },
];

export default function AppearanceSettings() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="p-5">
      <fieldset>
        <legend className="sr-only">Theme</legend>

        <div className="grid gap-3 sm:grid-cols-3">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={() => setTheme(option.value)}
                  className="peer sr-only"
                />
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/40 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-4 text-sm text-muted-foreground">
        Currently using the {resolvedTheme} theme.
      </p>
    </div>
  );
}