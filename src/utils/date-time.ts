import { ONE_MIN_IN_MS } from "~/constants/duration";
import { defaultLocale } from "~/constants/locale";

export const START_DATE: Date = new Date("2024-10-01T12:00:00.000+05:30");

export function formatAsLocalDate(date: Date | number | string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(defaultLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatAsLocalDateTime(date: Date | number | string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(defaultLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function transformDateToInputDate(
  date: string | Date | undefined,
): string | undefined {
  if (!date) return undefined;
  return getISOLikeLocalDate(new Date(date)).slice(0, 10);
}
export function transformDateToInputDateTime(
  date: string | Date | undefined,
): string | undefined {
  if (!date) return undefined;
  return getISOLikeLocalDate(new Date(date)).slice(0, 16);
}

export function getPlus1Date(date: Date | number | string): string | undefined {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return transformDateToInputDate(newDate);
}

function getISOLikeLocalDate(date: Date): string {
  const z = date.getTimezoneOffset() * ONE_MIN_IN_MS;
  const dateLocal = new Date(date.valueOf() - z);

  return dateLocal.toISOString();
}
