import { useEffect, useLayoutEffect } from "react";

export const useSafeLayoutEffect: typeof useEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
