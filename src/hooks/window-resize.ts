import { useCallback, useSyncExternalStore } from "react";
import { minMax, roundToDecimal } from "~/utils/math";

const DEFAULT_HEIGHT: number = 500;
const DEFAULT_WIDTH: number = 500;

/**
 * Hook to subscribe to the current inner-height of the window.
 * It is optimised to only update when the height changes by a factor of 10.
 */
export function useWindowInnerHeight(
  defaultHeight: number = DEFAULT_HEIGHT,
  disabled?: boolean,
): number {
  return useSyncExternalStore(
    disabled ? subscribeToNoop : subscribeToWindowResize,
    getWindowInnerHeightSnapshot,
    () => defaultHeight,
  );
}

/**
 * Hook to subscribe to the current inner-width of the window.
 * It is optimised to only update when the width changes by a factor of 10.
 */
export function useWindowInnerWidth(
  defaultWidth: number = DEFAULT_WIDTH,
  disabled?: boolean,
): number {
  return useSyncExternalStore(
    disabled ? subscribeToNoop : subscribeToWindowResize,
    getWindowInnerWidthSnapshot,
    () => defaultWidth,
  );
}

export function useElementHeight(
  elementRef: React.RefObject<HTMLElement>,
): number {
  const getSnapshot = useCallback(
    () => getElementHeightSnapshot(elementRef),
    [elementRef],
  );

  return useSyncExternalStore(subscribeToWindowResize, getSnapshot, () => 0);
}

export function useElementWidth(
  elementRef: React.RefObject<HTMLElement>,
): number {
  const getSnapshot = useCallback(
    () => getElementWidthSnapshot(elementRef),
    [elementRef],
  );

  return useSyncExternalStore(subscribeToWindowResize, getSnapshot, () => 0);
}

function subscribeToWindowResize(listener: () => void) {
  listener();
  window.addEventListener("resize", listener, { passive: true });
  return () => window.removeEventListener("resize", listener);
}

function getWindowInnerHeightSnapshot(decimalPlaces = -1) {
  return minMax(roundToDecimal(window.innerHeight, decimalPlaces));
}

function getWindowInnerWidthSnapshot(decimalPlaces = -1) {
  return minMax(roundToDecimal(window.innerWidth, decimalPlaces));
}

function getElementHeightSnapshot(
  elementRef: React.RefObject<HTMLElement>,
  fallback = 0,
) {
  return roundToDecimal(
    elementRef.current?.getBoundingClientRect().height || fallback,
    0,
  );
}

function getElementWidthSnapshot(
  elementRef: React.RefObject<HTMLElement>,
  fallback = 0,
) {
  return roundToDecimal(
    elementRef.current?.getBoundingClientRect().width || fallback,
    0,
  );
}

function subscribeToNoop() {
  return () => {};
}
