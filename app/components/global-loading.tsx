// Modified from https://github.com/remix-run/remix-website/blob/665f69b9ab3e84f59a4e884c9813251716961082/app/ui/global-loading.tsx

import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@remix-run/react";
import cx from "clsx";

export function GlobalLoading() {
  let transition = useNavigation();
  let active = transition.state !== "idle";

  let ref = useRef<HTMLDivElement>(null);
  let [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    Promise.allSettled(
      ref.current.getAnimations().map(({ finished }) => finished)
    ).then(() => {
      if (!active) setAnimating(false);
    });

    if (active) {
      let id = setTimeout(() => setAnimating(true), 100);
      return () => clearTimeout(id);
    }
  }, [active]);

  return (
    <div
      role="progressbar"
      aria-hidden={!active}
      aria-valuetext={active ? "Loading" : undefined}
      className="absolute inset-x-0 left-0 bottom-0 z-50 h-[1px] animate-pulse"
    >
      <div
        ref={ref}
        className={cx(
          "h-full bg-gradient-to-r from-vsct-1 via-vsct-2 to-vsct-3 transition-all duration-500 ease-in-out",
          transition.state === "idle" &&
            (animating ? "w-full" : "w-0 opacity-0 transition-none"),
          transition.state === "submitting" && "w-4/12",
          transition.state === "loading" && "w-10/12"
        )}
      />
    </div>
  );
}
