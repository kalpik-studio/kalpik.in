import { defaultLocale } from "~/constants/locale";

export function formatFileSizeToReadable(
  fileSizeInBytes: number,
  unit = "kilobyte",
): string {
  const fileSizeFormatter = Intl.NumberFormat(defaultLocale, {
    style: "unit",
    unit,
  });

  return fileSizeFormatter.format(fileSizeInBytes);
}
