import { useEffect, useRef } from "react";

export function useKeyDown(
  keyBindings:
    | {
        keys: string[] | string;
        handler: (event: KeyboardEvent) => void;
      }[]
    | undefined,
) {
  const bindingsRef = useRef(keyBindings);
  bindingsRef.current = keyBindings;

  useEffect(() => {
    const bindings = bindingsRef.current;
    if (!bindings || bindings.length === 0) {
      return () => {};
    }

    const handleDown = (event: KeyboardEvent) => {
      for (const binding of bindings) {
        const lowerCaseKeys = Array.isArray(binding.keys)
          ? binding.keys.map((k) => k.toLowerCase())
          : [binding.keys];

        if (lowerCaseKeys.includes("meta") && !event.metaKey) return;
        if (lowerCaseKeys.includes("shift") && !event.shiftKey) return;
        if (lowerCaseKeys.includes("alt") && !event.altKey) return;
        if (lowerCaseKeys.includes("ctrl") && !event.ctrlKey) return;

        if (lowerCaseKeys.includes(event.key)) {
          event.preventDefault();
          event.stopPropagation();
          binding.handler(event);
        }
      }
    };

    window.addEventListener("keydown", handleDown);

    return () => {
      window.removeEventListener("keydown", handleDown);
    };
  }, []);
}
