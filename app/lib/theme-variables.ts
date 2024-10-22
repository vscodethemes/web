import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

export function hsl(value: string) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();
  return `${h} ${s}% ${l}%`;
}

const backgroundDark = colord("hsl(0, 0%, 3.9%)");
const backgroundLight = colord("hsl(0, 0%, 100%)");
export function primary(value: string, dark: boolean) {
  let color = colord(value);

  if (dark) {
    // Ensure contrast with dark background.
    if (color.contrast(backgroundDark) < 3) {
      color = color.lighten(0.25);
    }
  } else {
    // Ensure contrast with light background.
    if (color.contrast(backgroundLight) < 3) {
      color = color.darken(0.15);
    }
  }

  const { h, s, l } = color.toHsl();

  return `${h} ${s}% ${l}%`;
}

export function background(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 6;
  } else {
    if (h === 0) {
      l = 100;
    } else {
      l = 96;
    }
  }

  s = Math.min(s, 50);

  return `${h} ${s}% ${l}%`;
}

export function foreground(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 95;
  } else {
    l = 6;
  }

  return `${h} ${s}% ${l}%`;
}

export function mutedForeground(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 70;
  } else {
    l = 20;
  }

  s = Math.min(s, 50);

  return `${h} ${s}% ${l}%`;
}

export function border(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 12;
  } else {
    l = 85;
  }

  s = Math.min(s, 50);

  return `${h} ${s}% ${l}%`;
}

export function ring(value: string) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  return `${h} ${s}% ${l}%`;
}

export function accent(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 10;
  } else {
    l = 90;
  }

  return `${h} ${s}% ${l}%`;
}

export function vsct(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 90;
  } else {
    l = 20;
  }

  return `${h} ${s}% ${l}%`;
}

export function secondary(value: string, dark: boolean) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();

  if (dark) {
    l = 12;
  } else {
    l = 88;
  }

  s = Math.min(s, 50);

  return `${h} ${s}% ${l}%`;
}
