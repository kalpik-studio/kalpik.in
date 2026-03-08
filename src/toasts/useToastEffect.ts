import { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router";
import {
  mountToast,
  unmountToast,
  type RenderToast,
} from "./remix-toast.client";
import type { ToastMessage } from "./types";

export function useLoaderToastEffect(
  toasts: (ToastMessage | undefined | null)[] | undefined | null,
): void {
  const navigate = useNavigate();

  useEffect(() => {
    if (!toasts) return;
    if (Array.isArray(toasts)) {
      const dismisses = toasts.map((t) => mountToast(t, navigate));

      return () => {
        for (const dismiss of dismisses) {
          dismiss();
        }
      };
    }

    return;
  }, [navigate, toasts]);
}

export function useNavigationToastEffect(): void {
  const { state } = useNavigation();

  useEffect(() => {
    if (!state) return;

    const id = "navigation";
    const data: Partial<RenderToast> = {
      id,
      dismissible: false,
      type: "loading",
    };

    if (state === "submitting")
      mountToast({ ...data, message: "Submitting..." }, undefined);
    if (state === "loading")
      mountToast({ ...data, message: "Loading..." }, undefined);
    if (state === "idle") unmountToast(id);
    return () => {
      unmountToast(id);
    };
  }, [state]);
}

export function useBannerToastEffect(
  id: string,
  predicate: () => RenderToast | null,
): void {
  useEffect(() => {
    const toast = predicate();
    if (toast) {
      mountToast(
        {
          ...toast,
          id,
          dismissible: false,
          duration: Number.POSITIVE_INFINITY,
        },
        undefined,
      );
    } else {
      unmountToast(id);
    }
  }, [id, predicate]);
}
