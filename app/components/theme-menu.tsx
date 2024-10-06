import { useState, useLayoutEffect } from "react";
import { useSubmit } from "@remix-run/react";
import {
  SunIcon,
  MoonIcon,
  DesktopIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export interface ThemeMenuProps {
  value: "dark" | "light" | "system";
}

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function ThemeMenu({ value }: ThemeMenuProps) {
  const submit = useSubmit();
  const [isDark, setIsDark] = useState(value !== "light");

  useLayoutEffect(() => {
    if (value === "system") {
      setIsDark(prefersDark());
    } else {
      setIsDark(value === "dark");
    }
  }, [value]);

  const handleThemeChange = (theme: "dark" | "light" | "system") => {
    submit(
      { theme },
      { method: "POST", action: location.pathname + location.search }
    );

    const isDark = theme === "dark" || (theme === "system" && prefersDark());
    setIsDark(isDark);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-3 text-muted-foreground">
          {isDark ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="w-4 h-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled={value === "light"}
          onClick={() => handleThemeChange("light")}
        >
          <SunIcon className="w-4 h-4 mr-2" />
          <div className="flex-1">Light</div>
          {value === "light" && <CheckIcon className="w-4 h-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={value === "dark"}
          onClick={() => handleThemeChange("dark")}
        >
          <MoonIcon className="w-4 h-4 mr-2" />
          <div className="flex-1">Dark</div>
          {value === "dark" && <CheckIcon className="w-4 h-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={value === "system"}
          onClick={() => handleThemeChange("system")}
        >
          <DesktopIcon className="w-4 h-4 mr-2" />
          <div className="flex-1">System</div>
          {value === "system" && <CheckIcon className="w-4 h-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
