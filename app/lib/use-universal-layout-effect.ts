import { useLayoutEffect } from "react";

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const useUniversalLayoutEffect = canUseDOM ? useLayoutEffect : () => {};

export { useUniversalLayoutEffect };
