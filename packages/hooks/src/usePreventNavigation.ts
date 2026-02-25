import { useEffect } from "react";
import { useBlocker } from "@innbell/router";

const DEFAULT_MESSAGE = "Do you want to discard unsaved changes?";

export function usePreventNavigation(
  shouldPrevent: boolean,
  message: string = DEFAULT_MESSAGE,
) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      shouldPrevent && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      if (confirm(message)) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  useEffect(() => {
    if (!shouldPrevent) {
      return () => {};
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = true;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });
}
