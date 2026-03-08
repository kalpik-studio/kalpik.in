import { useEffect, useState } from "react";
import { useRevalidator } from "react-router";
import { ONE_S_IN_MS } from "~/constants/duration";

const DEFAULT_INTERVAL = 5 * ONE_S_IN_MS;

export type UseLoaderPollingOptions = {
  enabled?: boolean;
  interval?: number;
};

export function useLoaderPolling({
  enabled = true,
  interval = DEFAULT_INTERVAL,
}: UseLoaderPollingOptions = {}): ReturnType<typeof useRevalidator> {
  const [paused, setPaused] = useState(false);
  const revalidator = useRevalidator();

  useEffect(() => {
    if (!enabled || paused) return;

    const intervalId = setInterval(() => {
      if (revalidator.state === "idle") revalidator.revalidate();
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, revalidator, enabled, paused]);

  useEffect(() => {
    if (!enabled) return;

    const onVisibilityChange = () => {
      setPaused(window.document.visibilityState !== "visible");
    };
    window.addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      window.removeEventListener("visibilitychange", onVisibilityChange);
  }, [enabled]);

  return revalidator;
}
