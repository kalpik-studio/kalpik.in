export const allowedPageSizes = [20, 40, 60, 80, 100] as const;
export type PageSize = (typeof allowedPageSizes)[number];

export const defaultPageSize: PageSize = 40;
export const minPageSize: PageSize = 20;
export const maxPageSize: PageSize = 100;

export const pageSizeOptions = allowedPageSizes.map(
  (size) =>
    ({
      label: size.toString(),
      value: size.toString(),
    }) as const,
);
