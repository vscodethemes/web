// Modified from https://github.com/remix-run/remix-website/blob/main/app/lib/color-scheme.tsx

import { useMemo } from "react";
import { useRouteLoaderData } from "@remix-run/react";
import type { loader as rootLoader } from "~/root";
import { useUniversalLayoutEffect } from "~/lib/use-universal-layout-effect";

export type Theme = "light" | "dark" | "system";

export function useUserTheme(): Theme {
  let rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  return rootLoaderData?.userTheme ?? "system";
}

function syncUserTheme(media: MediaQueryList | MediaQueryListEvent) {
  if (media.matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function UserThemeScript() {
  let userTheme = useUserTheme();
  let script = useMemo(
    () => `
        let userTheme = ${JSON.stringify(userTheme)};
        if (userTheme === "system") {
          let media = window.matchMedia("(prefers-color-scheme: dark)")
          if (media.matches) document.documentElement.classList.add("dark");
        }
      `,
    []
  );

  useUniversalLayoutEffect(() => {
    switch (userTheme) {
      case "light":
        document.documentElement.classList.remove("dark");
        break;
      case "dark":
        document.documentElement.classList.add("dark");
        break;
      case "system":
        let media = window.matchMedia("(prefers-color-scheme: dark)");
        syncUserTheme(media);
        media.addEventListener("change", syncUserTheme);
        return () => media.removeEventListener("change", syncUserTheme);
      default:
        console.error("Impossible color scheme state:", syncUserTheme);
    }
  }, [userTheme]);

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
