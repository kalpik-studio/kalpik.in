import invariant from "./invariant";
import { createErrorResponse } from "./response.server";

export function getEmailFromFormDataOrThrow(formData: FormData): string {
  const email = formData.get("email");
  invariant(typeof email === "string", "email must be a string");
  invariant(email.length > 0, "email must not be empty");

  return email;
}

export function getPasswordFromFormDataOrThrow(
  formData: FormData,
  name = "password",
): string {
  const password = formData.get(name);
  invariant(typeof password === "string", "password must be a string");
  invariant(password.length > 0, "password must not be empty");

  return password;
}

export async function getValueFromFormDataOrThrowErrorResponse(
  formData: FormData,
  name: string,
  message?: string,
  disableToast = false,
): Promise<string> {
  const value = formData.get(name)?.toString();

  if (!value) {
    message ??= `Property '${name}' is required.`;
    throw createErrorResponse(message, !disableToast);
  }

  return value;
}
