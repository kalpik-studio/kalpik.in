import { LRUCache } from "lru-cache";
import { ONE_HOUR_IN_MS } from "~/constants/duration";

export type { LRUCache };

export function createLRUCache<T extends object = object>(): LRUCache<
  string,
  T,
  unknown
> {
  return new LRUCache<string, T>({
    max: 1000,
    ttl: ONE_HOUR_IN_MS,
    ttlAutopurge: false,
    updateAgeOnGet: true,
    size: 100,
  });
}

export async function cachify<T extends object>(
  cache: LRUCache<string, object>,
  key: string,
  fetchValue: () => Promise<T>,
  fallback: T,
): Promise<T> {
  if (cache.has(key)) {
    return cache.get(key)! as T;
  }

  try {
    const result = await fetchValue();
    cache.set(key, result);

    return result;
  } catch {
    cache.delete(key);
    return fallback;
  }
}
