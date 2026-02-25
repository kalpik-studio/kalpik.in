export function readFromLocalStorage(key: string): string | null {
  return window.localStorage.getItem(key);
}

export function writeToLocalStorage(key: string, value: string): void {
  return window.localStorage.setItem(key, value);
}

export function removeFromLocalStorage(key: string): void {
  return window.localStorage.removeItem(key);
}

/**
 * Attempts to read a value from local storage and parse it as JSON.
 * If the key does not exist, or if parsing fails, the fallback value is returned.
 * If a validator function is provided and returns false for the parsed object,
 * the fallback value is returned.
 * If a transformer function is provided, it is applied to the parsed value
 * before returning; otherwise, the parsed value is cast to the generic type T
 * and returned.
 *
 * @param key - The local storage key to read from.
 * @param fallback - The value to return if retrieval or parsing fails.
 * @param validator - A function that checks if the parsed object is valid.
 * @param transformer - An optional function to transform the parsed object before returning.
 * @returns The parsed value if successful, or the fallback value otherwise.
 */
export function readFromLocalStorageAndParse<T = unknown>(
  key: string,
  fallback: T,
  validator: (value: object) => boolean,
  transformer?: (value: object) => T,
): T {
  const text = readFromLocalStorage(key);
  let parsedValue = fallback;
  try {
    if (text) {
      const value = JSON.parse(text);
      if (value && validator(value)) {
        parsedValue = transformer?.(value) || (value as T);
      }
    }
  } catch {
    // Do nothing
  }

  return parsedValue;
}
