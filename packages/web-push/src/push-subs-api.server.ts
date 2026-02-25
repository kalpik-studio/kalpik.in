import { z } from "zod";
import type { RecordListOptions } from "@innbell/pocketbase/api";
import { pocketBaseCollectionApi } from "@innbell/pocketbase/api";
import type {
  PushSubscriptionsResponse,
  TypedPocketBase,
} from "@innbell/pocketbase/types";
import { reportError } from "@innbell/reports/reporter";
import type { WebPushSubscription } from "./web-push.server";

export const pushSubscriptionsApi = pocketBaseCollectionApi.pushSubscriptions;

export async function getPushSubscriptionsForCustomer(
  pocketBase: TypedPocketBase,
  customerId: string,
  options?: RecordListOptions,
): Promise<WebPushSubscription[]> {
  const result = await pushSubscriptionsApi.list(pocketBase, {
    ...options,
    sort: "created",
    filter: `customer='${customerId}'`,
  });

  return result.items.map(
    transformPushSubscriptionsResponseToWebPushSubscription,
  );
}

export async function deletePushSubscription(
  pocketBase: TypedPocketBase,
  id: string,
): Promise<boolean> {
  return await pushSubscriptionsApi.delete(pocketBase, id);
}

export async function deleteAllPushSubscriptionForCustomer(
  pocketBase: TypedPocketBase,
  customerId: string,
): Promise<boolean> {
  const list = await pushSubscriptionsApi.list(pocketBase, {
    sort: "created",
    filter: `customer='${customerId}'`,
    perPage: 1000,
    fields: "id",
  });
  const promises = list.items.map((item) =>
    deletePushSubscription(pocketBase, item.id),
  );

  const result = await Promise.all(promises);

  return result.some((r) => r === false) ? false : true;
}

const subscriptionSchema = z.object({
  endpoint: z.string(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});

export async function createPushSubscription(
  pocketBase: TypedPocketBase,
  customerId: string,
  subscription: string,
  deviceId?: string,
): Promise<PushSubscriptionsResponse | null> {
  try {
    const sub = JSON.parse(subscription);
    const parsedSubscription = subscriptionSchema.parse(sub);

    return await pushSubscriptionsApi.create(pocketBase, {
      customer: customerId,
      endpoint: parsedSubscription.endpoint,
      p256dh: parsedSubscription.keys.p256dh,
      auth: parsedSubscription.keys.auth,
      device: deviceId,
    });
  } catch (error) {
    reportError(error);
    return null;
  }
}

function transformPushSubscriptionsResponseToWebPushSubscription(
  item: PushSubscriptionsResponse,
): WebPushSubscription {
  return {
    _id: item.id,
    _device: item.device,
    endpoint: item.endpoint,
    keys: { auth: item.auth, p256dh: item.p256dh },
  };
}
