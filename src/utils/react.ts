import { useCallback, useRef } from "react";

export function mergeRefs<T = unknown>(
  ...refs: Array<
    React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null
  >
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    }
  };
}

export function submitFormWithConfirm(
  message: string = "Are you sure?",
  onConfirm?: () => void,
  onDecline?: () => void,
): (event: React.FormEvent<HTMLFormElement>) => void {
  return (event) => {
    if (confirm(message)) {
      return onConfirm?.();
    }

    event.preventDefault();
    event.stopPropagation();

    return onDecline?.();
  };
}

export function useRefList<T>(): {
  listRef: React.MutableRefObject<Map<string, T>>;
  setRef: (key: string) => (ref: T | null) => void;
  getRef: (key: string) => NonNullable<T> | null;
} {
  const listRef = useRef<Map<string, T>>(new Map());

  const getRef = useCallback(
    (key: string) => listRef.current.get(key) ?? null,
    [],
  );

  const setRef = useCallback(
    (key: string) => (ref: T | null) => {
      ref && listRef.current.set(key, ref);
    },
    [],
  );

  return { listRef, setRef, getRef };
}
