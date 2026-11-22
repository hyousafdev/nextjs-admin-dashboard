"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import DropdownMenu from "@/components/ui/DropdownMenu";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu
      label="Change theme"
      items={[
        {
          label: "Light",
          icon: Sun,
          checked: theme === "light",
          onSelect: () => setTheme("light"),
        },
        {
          label: "Dark",
          icon: Moon,
          checked: theme === "dark",
          onSelect: () => setTheme("dark"),
        },
        {
          label: "System",
          icon: Monitor,
          checked: theme === "system",
          onSelect: () => setTheme("system"),
        },
      ]}
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </DropdownMenu>
  );
}