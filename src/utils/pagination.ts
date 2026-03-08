export function calculateVisiblePages(
  totalPages: number,
  page: number,
  limit = 7,
): number[] {
  if (totalPages <= limit) return genNumberArray(totalPages);

  const middle = Math.round(limit / 2);
  if (page <= middle) {
    return [...genNumberArray(limit - 2, 1), 0, totalPages];
  }
  const top = totalPages - limit + 2;
  if (page > top) {
    return [1, 0, ...genNumberArray(totalPages, top + 1)];
  }

  const edge = Math.floor((limit - 4) / 2);
  return [1, 0, ...genNumberArray(page + edge, page - edge), 0, totalPages];
}

function genNumberArray(end: number, start: number = 1): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
