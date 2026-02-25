// Credit: https://github.com/Code-Forge-Net/remix-toast/tree/v1.1.0

import { z } from "zod";
import env from "@innbell/constants/env";
import { createCookieSessionStorage, type Session } from "@innbell/router";
import { createTempPassword } from "@innbell/utils/crypto";
import { flashSessionValuesSchema, type ToastMessage } from "./types";

export type { ToastMessage };

const FLASH_SESSION = "flash";
const cookieName = "innbell-toast-session";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: cookieName,
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    secrets: [env.SESSION_SECRET],
  },
});

/**
 * Helper method used to get the toast data from the current request and purge the flash storage from the session
 * @param request Current request
 * @returns Returns the the toast notification if exists, undefined otherwise and the headers needed to purge it from the session
 */
export async function getToastFromRequest(
  request: Request,
): Promise<{ toast: ToastMessage | null; headers: Headers }> {
  const cookie = request.headers.get("Cookie");
  const { session, toast } = await parseToastsFromCookie(cookie);
  const cookieValue = await sessionStorage.commitSession(session);
  const headers = new Headers();
  headers.append("Set-Cookie", cookieValue);

  return { toast, headers };
}

export type ToastMessageInput = string | Omit<ToastMessage, "type">;

export const newToast: {
  base: ToastFn<ToastMessage>;
  error: ToastFn<ToastMessageInput | Error>;
  info: ToastFn;
  success: ToastFn;
  warning: ToastFn;
} = {
  base: createToastFactory<ToastMessage>(undefined),
  error: createToastFactory<ToastMessageInput | Error>("error"),
  info: createToastFactory("info"),
  success: createToastFactory("success"),
  warning: createToastFactory("warning"),
};

type ToastFn<T extends ToastMessageInput = ToastMessageInput> = (
  input: T,
) => Promise<Headers>;

function createToastFactory<T extends ToastMessageInput = ToastMessageInput>(
  type: ToastMessage["type"],
): ToastFn<T> {
  return async (input) =>
    flashMessage({
      toast: messageInputToMessage(type, input),
    });
}

function messageInputToMessage(
  type: ToastMessage["type"],
  input: ToastMessageInput | ToastMessage,
): ToastMessage {
  if (typeof input === "object" && "type" in input) {
    return { ...input, id: input.id ?? createTempPassword(input.message) };
  }

  return {
    type,
    ...(typeof input === "string"
      ? { message: input, id: createTempPassword(input) }
      : { ...input, id: input.id ?? createTempPassword(input.message) }),
  };
}

async function flashMessage(
  flash: z.infer<typeof flashSessionValuesSchema>,
): Promise<Headers> {
  const session = await sessionStorage.getSession();
  session.flash("flash", flash);
  const cookie = await sessionStorage.commitSession(session);

  const headers = new Headers();
  headers.append("Set-Cookie", cookie);
  return headers;
}

async function parseToastsFromCookie(
  cookie: string | null | undefined,
): Promise<{ toast: ToastMessage | null; session: Session }> {
  const session = await sessionStorage.getSession(cookie);
  const result = flashSessionValuesSchema.safeParse(session.get(FLASH_SESSION));
  const toast = result.success ? result.data.toast : null;

  return { toast, session };
}
