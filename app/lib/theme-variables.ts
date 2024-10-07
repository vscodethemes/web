import { colord } from "colord";

export function hsl(value: string) {
  const color = colord(value);
  let { h, s, l } = color.toHsl();
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

  return `${h} ${s}% ${l}%`;
}
