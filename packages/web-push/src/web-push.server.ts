import webPush from "web-push";
import env from "@innbell/constants/env";
import type { TypedPocketBase } from "@innbell/pocketbase/types";
import { ReportEventLevel, ReportEventName } from "@innbell/reports";
import { reportAxiomEvent } from "@innbell/reports/axiom";
import { newToast } from "@innbell/toasts";
import {
  createErrorResponse,
  throwRedirect,
  type ResponseDataError,
} from "@innbell/utils/response";
import {
  deletePushSubscription,
  getPushSubscriptionsForCustomer,
} from "./push-subs-api.server";

webPush.setVapidDetails(
  "mailto:contact@innbell.com",
  env._VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
);

/**
 * The `notifyViaPushNotification` function is responsible for sending the provided payload as a
 * push notification to a specific customer, identified by their customer ID. It makes use of the
 * `getPushSubscriptionsForCustomer` function to retrieve all push notification subscriptions
 * associated with the customer. It then sends out the notifications using the
 * `sendPushNotifications` service.
 *
 * If the `customerId` is undefined, it immediately returns a JSON error response indicating that
 * no customer ID was provided.
 *
 * If the `customerId` is provided, it proceeds to send the notifications. Once the notifications
 * have been sent, it checks if there were any failed notification deliveries by examining the
 * `failedIds` array. If there are failed deliveries, it attempts to clean up by deleting the
 * failed subscriptions using the `deletePushSubscription` function.
 *
 * Finally, it returns an appropriate redirect response based on the outcome of the notification
 * sending process:
 * - If no notifications failed, it returns a success message.
 * - If all notifications failed, it returns an error message.
 * - If some notifications succeeded and some failed, it returns an informational message.
 *
 * @param pocketBase - An instance of TypedPocketBase to interact with the PocketBase API.
 * @param customerId - The unique identifier for the customer to whom the notification should be sent.
 * @param payload - The notification content to be sent, represented as a stringified JSON object.
 * @returns A promise that resolves to a response object that represents the outcome of the operation.
 */
export async function notifyViaPushNotification(
  request: Request,
  pocketBase: TypedPocketBase,
  customerId: string | undefined,
  payload: string,
  silent?: boolean,
): Promise<ResponseDataError> {
  if (!customerId) return createErrorResponse("No customer ID provided.");

  const subscriptions = await getPushSubscriptionsForCustomer(
    pocketBase,
    customerId,
  );
  const { failedIds } = await sendPushNotifications(subscriptions, payload);
  let headers: Headers | undefined;

  if (failedIds.length === 0) {
    reportPushNotificationsSent(request, customerId, payload, true);
    if (!silent) {
      headers = await newToast.success(
        "Push notification(s) sent successfully.",
      );
    }
  } else {
    reportPushNotificationsSent(request, customerId, payload, false);
    await Promise.all(
      failedIds.map((id) => deletePushSubscription(pocketBase, id)),
    );

    if (!silent) {
      if (failedIds.length === subscriptions.length) {
        headers = await newToast.error(
          "Push notification(s) could not be sent.",
        );
      } else {
        headers = await newToast.warning(
          "Some push notification(s) could not be sent.",
        );
      }
    }
  }

  return throwRedirect(request, { headers });
}

export type WebPushSubscription = webPush.PushSubscription & {
  _id: string;
  _device?: string;
};

/**
 * Sends push notifications to multiple subscriptions.
 *
 * @param subscriptions - An array of WebPushSubscription objects.
 * @param payload - The message payload to be sent in the notifications.
 * @returns A promise that resolves to an object containing an array of failed subscription IDs.
 */
async function sendPushNotifications(
  subscriptions: WebPushSubscription[],
  payload: string,
): Promise<{ failedIds: string[] }> {
  const promises = subscriptions.map((subscription) =>
    sendPushNotification(subscription, payload),
  );

  const results = await Promise.all(promises);
  const failedIds = results
    .filter((result) => !result.success)
    .map((result) => result.id);

  return { failedIds };
}

/**
 * Attempts to send a push notification to a single subscription.
 *
 * @param subscription - The subscription to which the notification will be sent.
 * @param payload - The message payload to be sent in the notification.
 * @returns A promise that resolves to an object containing the success status and the ID of the subscription.
 */
async function sendPushNotification(
  subscription: WebPushSubscription,
  payload: string,
): Promise<{ success: boolean; id: string }> {
  try {
    await webPush.sendNotification(subscription, payload);
    return { success: true, id: subscription._id };
  } catch {
    return { success: false, id: subscription._id };
  }
}

async function reportPushNotificationsSent(
  request: Request | undefined,
  customerId: string,
  payload: string,
  success: boolean,
) {
  return await reportAxiomEvent(
    ReportEventName.PushNotificationSent,
    { sendee: customerId, payload },
    {
      request,
      level: success ? ReportEventLevel.Info : ReportEventLevel.Error,
    },
  );
}
