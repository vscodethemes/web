import { validate } from './colorQuery';

export const getQueryParam = (params: URLSearchParams, key: string): string | undefined => {
  return params.get(key) ?? undefined;
};

export const getArrayQueryParam = (params: URLSearchParams, key: string): string[] | undefined => {
  return params.getAll(key) ?? undefined;
};

export const getNumberQuery = (params: URLSearchParams, key: string): number | undefined => {
  const stringParam = getQueryParam(params, key);
  if (!stringParam) return undefined;

  const num = parseInt(stringParam, 10);
  if (isNaN(num)) return undefined;

  return num;
};

export const getColorParam = (params: URLSearchParams, key: string): string | undefined => {
  const stringParam = getQueryParam(params, key);
  if (!stringParam) return undefined;

  try {
    return validate(stringParam).alpha(1).toHex();
  } catch (err) {
    return undefined;
  }
};

const validSortBy = [
  'relevance',
  'installs',
  'trendingWeekly',
  'trendingMonthly',
  'updatedAt',
] as const;

export const getSortByParam = (
  params: URLSearchParams,
  key: string,
): typeof validSortBy[number] | undefined => {
  const stringParam: any = getQueryParam(params, key);
  if (stringParam) {
    if (validSortBy.includes(stringParam)) {
      return stringParam;
    }
    return undefined;
  }
  return undefined;
};
