export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string, separator = "-"): string {
  return str
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036F]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]+/g, separator) // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator)
    .slice(0, 100);
}

export function snakeToCamelCase(str: string) {
  return str.toLowerCase().replace(/(_\w)/g, (m) => m.toUpperCase().substr(1));
}
