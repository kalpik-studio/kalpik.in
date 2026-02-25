import {
  defaultPageSize,
  maxPageSize,
  minPageSize,
  type PageSize,
} from "@innbell/constants/pagination";
import {
  getPlus1Date,
  START_DATE,
  transformDateToInputDate,
} from "./date-time";
import { minMax, roundToCeiling } from "./math";

export function getPaginationParamsFromSearchParams(
  searchParams: URLSearchParams,
  defaultValue: { page?: number; perPage?: PageSize } = {},
): { page: number; perPage: number } {
  const perPage = Number.parseInt(
    searchParams.get("perPage") ||
      (defaultValue.perPage || defaultPageSize).toString(),
    10,
  );
  const normalisedPerPage = roundToCeiling(
    minMax(perPage, minPageSize, maxPageSize),
    20,
  );

  const page = Number.parseInt(
    searchParams.get("page") || (defaultValue.page || 1).toString(),
    10,
  );
  const normalisedPage = minMax(page, 1);

  return { page: normalisedPage, perPage: normalisedPerPage };
}

export function getDateParamsFromSearchParams(
  searchParams: URLSearchParams,
  options: { maxDate?: Date; filter?: string; minDate?: Date } = {},
): {
  fromDate: string | undefined;
  toDate: string | undefined;
  maxDate: string | undefined;
  maxDateTime: string;
  minDate: string | undefined;
  minDateTime: string;
  dateFilters: string[];
  fromDateTime: string | undefined;
  toDateTime: string | undefined;
} {
  const {
    maxDate = new Date(),
    filter = "created",
    minDate = START_DATE,
  } = options;

  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");
  const fromDate = fromDateParam
    ? transformDateToInputDate(fromDateParam)
    : undefined;
  const fromDateTime = fromDateParam
    ? new Date(fromDateParam).toISOString()
    : undefined;
  const toDate = toDateParam
    ? transformDateToInputDate(toDateParam)
    : undefined;
  const toDateTime = toDateParam
    ? new Date(toDateParam).toISOString()
    : undefined;

  const dateFilters: string[] = [];
  if (filter && fromDate) dateFilters.push(`${filter}>='${fromDate}'`);
  if (filter && toDate)
    dateFilters.push(`${filter}<='${getPlus1Date(toDate)}'`);

  return {
    fromDate,
    toDate,
    maxDate: transformDateToInputDate(maxDate),
    maxDateTime: maxDate.toISOString(),
    minDate: transformDateToInputDate(minDate),
    minDateTime: minDate.toISOString(),
    dateFilters,
    fromDateTime,
    toDateTime,
  };
}
