export const integer = (
  searchParams: URLSearchParams,
  key: string,
  defaultValue: number,
  min: number,
  max: number
) => {
  const value = searchParams.get(key);
  if (value) {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      return Math.min(Math.max(num, min), max);
    }
  }
  return defaultValue;
};

export const float = (
  searchParams: URLSearchParams,
  key: string,
  defaultValue: number,
  min: number,
  max: number
) => {
  const value = searchParams.get(key);
  if (value) {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return Math.min(Math.max(num, min), max);
    }
  }
  return defaultValue;
};

export const string = (
  searchParams: URLSearchParams,
  key: string,
  defaultValue: string
) => {
  const value = searchParams.get(key);
  return value ?? defaultValue;
};

export const literal = <T extends string>(
  searchParams: URLSearchParams,
  key: string,
  defaultValue: T,
  validValues: readonly T[]
) => {
  const value = searchParams.get(key);
  if (value && validValues.includes(value as T)) {
    return value as T;
  }
  return defaultValue;
};
