// eslint-disable-file - no-console

import { sonner } from "@innbell/toasts/client";

export function checkWindowSupport<T extends string>(
  type: T,
  throwErr = false,
  sub?: (win: Window) => object,
): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    if (throwErr) throw new Error("The function should not run on server.");
    return false;
  }

  const scope = sub ? sub(window) : window;
  if (!(type in scope)) {
    if (throwErr) throw new Error(`'${type}' is not supported by the browser.`);
    return false;
  }

  return true;
}

export async function requestNotificationPermission(): Promise<NotificationPermission | null> {
  try {
    checkWindowSupport("Notification", true);

    return await new Promise((resolve, reject) =>
      window.Notification.requestPermission(resolve)?.then(resolve, reject),
    );
  } catch (err) {
    console.error("Unable to request notification permission.", err);
    return null;
  }
}

export async function subscribeUserToPushSubscription(): Promise<PushSubscription | null> {
  try {
    checkWindowSupport("PushManager", true);

    const registration = await registerServiceWorker();
    if (!registration) {
      throw new Error("No service worker registration.");
    }

    // @ts-ignore window.ENV may be not defined
    const VAPID_PUBLIC_KEY = window["ENV"]?._VAPID_PUBLIC_KEY;
    if (!VAPID_PUBLIC_KEY) {
      throw new Error("VAPID_PUBLIC_KEY is not set.");
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    });
    if (!subscription?.endpoint) throw new Error("No subscription endpoint.");

    return subscription;
  } catch (err) {
    console.error("Unable to subscribe user to pushManager.", err);
    return null;
  }
}

export async function checkExistingPushSubscription(): Promise<PushSubscription | null> {
  try {
    checkWindowSupport("PushManager", true);

    const registration = await registerServiceWorker();
    if (!registration) throw new Error("No service worker registration.");

    return await registration.pushManager.getSubscription();
  } catch (err) {
    console.error("Unable to subscribe user to pushManager.", err);
    return null;
  }
}

async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  try {
    checkWindowSupport("serviceWorker", true, (win) => win.navigator);

    return await window.navigator.serviceWorker.register("/service-worker.js");
  } catch (err) {
    console.error("Unable to register service worker.", err);
    return null;
  }
}

export function handleServiceWorkerMessageEvent(event: MessageEvent): void {
  const data = event.data as unknown;
  if (!data || typeof data !== "object" || !("intent" in data)) return;
  if (!("payload" in data) || !data.payload) return;

  switch (data.intent) {
    case "push-notification-navigate": {
      if (typeof data.payload === "string") {
        window.location.href = data.payload;
      }
      break;
    }

    case "push-notification-toast": {
      const payload = data.payload as {
        title?: string;
        linkUrl?: string;
        linkLabel?: string;
      };

      if (typeof payload !== "object") return;
      const title =
        "title" in payload && typeof payload.title === "string"
          ? payload.title
          : "";
      const linkUrl =
        "linkUrl" in payload && typeof payload.linkUrl === "string"
          ? payload.linkUrl
          : "";

      sonner(title, {
        ...payload,
        closeButton: true,
        duration: 10_000,
        dismissible: true,
        action: linkUrl
          ? {
              label: payload.linkLabel || "View",
              onClick: () => (window.location.href = linkUrl),
            }
          : undefined,
      });
      break;
    }
    default:
      break;
  }
}
