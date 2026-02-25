//@ts-check
/// <reference lib="webworker" />
/** @type {ServiceWorkerGlobalScope} worker */
// @ts-ignore
const worker = self;

const PostIntent = {
  NAVIGATE: "push-notification-navigate",
  TOAST: "push-notification-toast",
};

worker.addEventListener("load", (event) => {
  console.info("Service Worker Loaded...");
  event.waitUntil(worker.skipWaiting());
});

worker.addEventListener("install", (event) => {
  console.info("Service Worker Installed...");
  event.waitUntil(worker.skipWaiting());
});

worker.addEventListener("push", (event) => {
  const [title, options] = parsePushData(event.data?.json());

  const action = async () => {
    const focussedClient = await checkIsClientFocused();
    if (!focussedClient)
      return worker.registration.showNotification(title, options);

    const urlToOpen = extractUrlFromData(options.data);
    focussedClient.postMessage({
      intent: PostIntent.TOAST,
      payload: {
        title,
        description: options.body,
        type: "info",
        linkUrl: urlToOpen,
        linkLabel: options.data?.linkLabel,
      },
    });
  };

  event.waitUntil(action());
});

worker.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = extractUrlFromData(event.notification.data);
  if (!urlToOpen) return;

  const action = async () => {
    const clients = await getWindowClients();

    const exactClient = clients.find((c) => c.url === urlToOpen);
    if (exactClient) return exactClient.focus();

    const sameOriginClient = clients.find((c) =>
      c.url.startsWith(worker.location.origin),
    );
    if (sameOriginClient) {
      await sameOriginClient.focus();
      return sameOriginClient.postMessage({
        intent: PostIntent.NAVIGATE,
        payload: urlToOpen,
      });
    }

    return worker.clients.openWindow(urlToOpen);
  };

  event.waitUntil(action());
});

// Helpers

async function checkIsClientFocused() {
  const windowClients = await getWindowClients();
  return windowClients.find((c) => c.focused);
}

async function getWindowClients() {
  return await worker.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
}

/**
 * @param {unknown} data
 * @returns {string | undefined}
 */
function extractUrlFromData(data) {
  if (!data || typeof data !== "object") return;
  if (!("href" in data) || !data.href || typeof data.href !== "string") return;
  return new URL(data.href, worker.location.origin).href;
}

/**
 * @param {unknown} data
 * @returns {[ string, NotificationOptions]}}
 */
function parsePushData(data) {
  const defaultTitle = "New Notification";
  /** @type {NotificationOptions} */
  const options = {
    lang: "en",
    dir: "ltr",
    badge: "/favicons/android-icon-72x72.png",
    icon: "/favicons/android-icon-192x192.png",
    tag: "innbell",
  };
  if (!data) return [defaultTitle, options];
  if (typeof data === "string") return [data, options];
  if (typeof data !== "object") return [defaultTitle, options];

  const title =
    "title" in data && typeof data.title === "string"
      ? data.title
      : defaultTitle;

  return [title, { ...options, ...data }];
}

// // Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js
