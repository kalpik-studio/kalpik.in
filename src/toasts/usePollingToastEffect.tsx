import { useEffect } from "react";
import type { RevalidationState } from "react-router";
import { ONE_S_IN_MS } from "~/constants/duration";
import { sonner as toast } from "./remix-toast.client";

export function usePollingToast(
  state: RevalidationState,
  loadingMessage: string,
  doneMessage: string,
): void {
  useEffect(() => {
    const toastId = "polling-toast" + loadingMessage;
    if (state === "loading") {
      toast.dismiss(toastId);
      toast.loading(loadingMessage, { id: toastId });
    } else {
      toast(doneMessage, {
        id: toastId,
        closeButton: true,
        dismissible: true,
        duration: ONE_S_IN_MS,
      });
    }

    return () => {
      toast.dismiss(toastId);
    };
  }, [doneMessage, loadingMessage, state]);
}
