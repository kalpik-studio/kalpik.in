import { createCookie } from "react-router";
import { CSRF, CSRFError } from "remix-utils/csrf/server";
import env from "~/constants/env.server";

const csrfCookie = createCookie("innbell-csrf", {
  path: "/",
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  secrets: [env.SESSION_SECRET],
});

const csrf = new CSRF({
  cookie: csrfCookie,
  secret: env.SESSION_SECRET,
});

export async function commitCsrfToken(
  headers: Headers,
): Promise<readonly [string, string | null]> {
  return await csrf.commitToken(headers);
}

export async function validateCsrfTokenOrThrow(
  request: Request,
): Promise<void> {
  try {
    await csrf.validate(request.clone());
  } catch (error) {
    if (error instanceof CSRFError) {
      throw new Error("Something went wrong. Please try again.");
    }

    throw error;
  }
}
