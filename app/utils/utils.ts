/**
 * undefined or null 체크
 */
export const isNull = (value: unknown): boolean => {
  return value === undefined || value === null;
};

export const isNotNull = (value: unknown): boolean => {
  return value !== undefined || value !== null;
};
