/**
 * Filters an array of objects by a specific key, ensuring that only the first
 * occurrence of a value for the given key is present in the returned array.
 *
 * @param array - The array of objects to be filtered.
 * @param key - The key in the objects by which to filter for uniqueness.
 * @returns A new array of objects where each object has a unique value for the specified key.
 *
 * @throws Will throw an error if the first argument is not an array.
 * @throws Will throw an error if the key is not defined.
 * @throws Will throw an error if the key is not present in the first object of the array.
 *
 * @template T - The type of objects contained in the array, must extend object.
 *
 * @example
 * // Given an array of objects with a 'id' key
 * const items = [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }, { id: 1, name: 'Item1' }];
 * // Filtering by the 'id' key
 * const uniqueItems = filterUniqueObjectsInArrayByKey(items, 'id');
 * // Returns [{ id: 1, name: 'Item1' }, { id: 2, name: 'Item2' }]
 */
export function filterUniqueObjectsInArrayByKey<T extends object>(
  array: T[],
  key: keyof T,
): T[] {
  if (!Array.isArray(array)) throw new Error("Argument is not an array");
  if (array.length === 0) return [];
  if (!key) throw new Error("Key is not defined");
  if (array[0]?.[key] === undefined)
    throw new Error("Key is not defined in object");

  return Array.from(new Map(array.map((item) => [item[key], item])).values());
}
