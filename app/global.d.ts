import "react";
import { PlausibleProps } from "~/clients/plausible";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare global {
  interface Window {
    plausible: (
      event: string,
      data?: { u?: string; props?: PlausibleProps }
    ) => void;
  }
}
