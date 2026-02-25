import { toast as sonner, type ExternalToast } from "sonner";
import { type NavigateFunction } from "@innbell/router";
import type { ToastMessage } from "./types";

export type RenderToast = ExternalToast &
  Omit<ToastMessage, "message" | "id" | "description"> & {
    message: React.ReactNode;
    id?: string | number;
    description?: React.ReactNode;
  };

export function mountToast(
  toast: RenderToast | null | undefined,
  navigate: NavigateFunction | undefined,
) {
  if (!toast) return () => {};

  const { message, type, linkUrl, linkLabel, ...rest } = toast;

  const action: ExternalToast["action"] =
    rest.action ??
    (linkUrl
      ? {
          label: linkLabel || "Link",
          onClick: () => {
            if (linkUrl.startsWith("http")) {
              window.open(linkUrl, "_blank");
            } else {
              if (navigate) navigate(linkUrl);
              else {
                window.location.replace(linkUrl);
              }
            }
          },
        }
      : undefined);

  const toastId = (type ? sonner[type] : sonner)(message, {
    ...rest,
    action,
  });

  if (!toast.dismissible) {
    return () => {};
  }

  return () => {
    sonner.dismiss(toastId);
  };
}

export function unmountToast(id: string | number | undefined) {
  return sonner.dismiss(id);
}

export { sonner };
