import { useMemo, useEffect, useRef } from "react";
import { useRouteLoaderData, useLocation, Location } from "@remix-run/react";
import type { loader as rootLoader } from "~/root";

export function AnalyticsScript() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  const location = useLocation();
  const prevLocation = useRef<Location<any>>();

  useEffect(() => {
    if (
      prevLocation.current?.pathname === location.pathname &&
      prevLocation.current?.search === location.search
    ) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("q") ?? "";
    const sort = searchParams.get("sort") ?? "";
    const page = searchParams.get("page") ?? "";
    const userTheme = rootLoaderData?.userTheme;
    const userLanguage = rootLoaderData?.userLanguage;

    window.plausible("pageview", {
      u: `${location.pathname}${location.search}`,
      props: { q, sort, page, userTheme, userLanguage },
    });

    prevLocation.current = location;
  }, [location]);

  const script = useMemo(
    () =>
      `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
    []
  );

  return (
    <>
      <script
        defer
        data-domain="vscodethemes.com"
        src="https://plausible.vscodethemes.com/js/script.manual.pageview-props.tagged-events.js"
      ></script>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
