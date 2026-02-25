import * as React from "react";
import { Icon, IconName } from "@innbell/components/Icon.tsx";
import type { CustomersWithPreferencesResponse } from "@innbell/pocketbase/custom";
import {
  checkExistingPushSubscription,
  checkWindowSupport,
  subscribeUserToPushSubscription,
} from "@innbell/pwa";
import { useSubmit, type SubmitFunction } from "@innbell/router";
import { AppRoute } from "@innbell/router/routes";
import { mountToast, sonner, unmountToast } from "@innbell/toasts/client";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@innbell/utils/local-storage";
import type { WebPushSubscription } from "./web-push.server";

const LOCAL_STORAGE_ID = "innbell-push-notification-denied";

export function useSubscribeToPushNotifications(
  customer: CustomersWithPreferencesResponse | null,
  pushSubscriptions: WebPushSubscription[] | Promise<WebPushSubscription[]>,
): void {
  const submit = useSubmit();

  React.useEffect(() => {
    const toastId = "notification-toast";
    if (!customer) return;

    const supported = checkWindowSupport("Notification");
    if (!supported) return;

    const isDenied = readFromLocalStorage(LOCAL_STORAGE_ID) === "true";
    if (isDenied) return;

    performAction(toastId, submit, pushSubscriptions).catch(console.error);

    return () => {
      unmountToast(toastId);
    };
  }, [customer, pushSubscriptions, submit]);
}

async function performAction(
  toastId: string | number,
  submit: SubmitFunction,
  pushSubscriptions: WebPushSubscription[] | Promise<WebPushSubscription[]>,
): Promise<void> {
  const subscription = await checkExistingPushSubscription();
  const existingDbSubscriptions = await pushSubscriptions;

  if (
    subscription &&
    existingDbSubscriptions.some(
      (sub) => sub.endpoint === subscription.endpoint,
    )
  ) {
    // Already subscribed and saved in database.
    return;
  }

  switch (window.Notification.permission) {
    case "default": {
      toastAskPermission(
        toastId,
        () => toastSubscribePush(submit),
        () => writeToLocalStorage(LOCAL_STORAGE_ID, "true"),
      );
      break;
    }
    case "granted": {
      toastSubscribePush(submit);
      break;
    }
    case "denied":
    default:
      break;
  }

  return;
}

function toastAskPermission(
  id: string | number,
  onClick: () => void,
  onCancel?: () => void,
): () => void {
  return mountToast(
    {
      type: "info",
      message: "Enable notifications",
      id,
      icon: <Icon name={IconName.BELL} />,
      important: true,
      duration: Number.POSITIVE_INFINITY,
      action: { label: "Yes!", onClick },
      cancel: onCancel ? { label: "No", onClick: onCancel } : undefined,
      dismissible: true,
      closeButton: true,
      description:
        "Do you wish to receive notifications for enquiries and chat replies?",
    },
    undefined,
  );
}

function toastSubscribePush(submit: SubmitFunction): string | number {
  const promise = async () => {
    const subscription = await subscribeUserToPushSubscription();
    if (!subscription) throw new Error("Failed to subscribe to notifications.");

    const value = JSON.stringify(subscription);
    const formData = new FormData();
    formData.append("subscription", value);

    return submit(formData, {
      action: AppRoute.API_PUSH_SUBSCRIBE,
      navigate: false,
      method: "POST",
      replace: true,
      fetcherKey: value,
    });
  };

  return sonner.promise(promise, {
    loading: "Subscribing to notifications...",
    error: "Failed to subscribe to notifications.",
    success: "Subscribed to notifications!",
  });
}
