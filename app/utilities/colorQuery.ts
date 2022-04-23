import { colord, Colord } from 'colord';

export const validate = (str: string): Colord => {
  const [type, value] = str.split('|');

  let color: Colord;
  if (type === 'hex') {
    color = colord(`#${value}`);
  } else if (type === 'rgb') {
    color = colord(`rgb(${value})`);
  } else if (type === 'hsl') {
    const [h, s, l] = value.split(',');
    color = colord(`hsl(${h.trim()},${s.trim()}%,${l.trim()}%)`);
  } else {
    color = colord(value || type);
  }

  if (!color.isValid()) {
    throw new Error(`Invalid color value ${value}`);
  }

  return color;
};

export const colorQueryParams = [
  'editorBackground',
  'activityBarBackground',
  'statusBarBackground',
  'tabActiveBackground',
  'titleBarActiveBackground',
  'colorDistance',
];

export const resetColorQuery = (searchParams: URLSearchParams) => {
  for (const param of colorQueryParams) {
    searchParams.delete(param);
  }
};

export const hasColorQuery = (searchParams: URLSearchParams) => {
  for (const param of colorQueryParams) {
    if (searchParams.get(param)) {
      return true;
    }
  }
  return false;
};
