import { data } from "react-router";
import { HttpStatusCode } from "~/constants/http";
import { newToast, type ToastMessage } from "~/toasts";
import { ResponseDataStatus, type DataWithResponseInit } from "~/utils/remix";
import {
  parsePocketBaseErrorMessage,
  type ParsedError,
} from "./pb-error.server";

export type DataResult<T extends object = object> = DataSuccess<T> | DataError;
export type DataSuccess<T extends object = object> = T & {
  status: ResponseDataStatus.Success;
};
export type DataError = {
  status: ResponseDataStatus.Error;
  error: string;
  errors?: ParsedError["errors"];
};

export type ResponseData<T extends object = object> = DataWithResponseInit<
  DataError | DataSuccess<T>
>;

export type ResponseDataError = DataWithResponseInit<DataError>;
export type ResponseDataSuccess<T extends object> = DataWithResponseInit<
  DataSuccess<T>
>;

export async function createErrorResponse(
  error: unknown,
  toast?: Partial<Omit<ToastMessage, "type">> | boolean,
  responseInit?: ResponseInit,
  _errors?: Record<string, string>,
): Promise<ResponseDataError> {
  if (error instanceof Response) throw error;

  const errorData = createErrorData(error, _errors);
  const resStatus = responseInit?.status ?? HttpStatusCode.BadRequest;

  if (toast && errorData.error) {
    const toastHeaders = await newToast.error(
      typeof toast === "boolean"
        ? { message: errorData.error }
        : { message: errorData.error, ...toast },
    );
    const headers = mergeToResponseHeaders(
      toastHeaders,
      responseInit?.headers as Headers,
    );

    return data(errorData, { headers, status: resStatus });
  }

  return data(errorData, { ...responseInit, status: resStatus });
}

export function createErrorData(
  error: unknown,
  _errors?: Record<string, string>,
): DataError {
  const { errorMessage, errors = _errors } = parsePocketBaseErrorMessage(error);

  return {
    status: ResponseDataStatus.Error,
    error: errorMessage,
    errors,
  };
}

export function createSuccessData<T extends object>(data: T): DataSuccess<T> {
  return { status: ResponseDataStatus.Success, ...data };
}

export function createSuccessResponse<T extends object>(
  value: T,
  responseInit?: ResponseInit,
): ResponseDataSuccess<T> {
  return data(createSuccessData(value), {
    status: HttpStatusCode.Ok,
    ...responseInit,
  });
}

// Redirects

export function createUrlWithSearchParams(
  urlOrRequest: string | URL | Request,
  _searchParams?: URLSearchParams | Request,
): string {
  const url =
    typeof urlOrRequest === "string"
      ? urlOrRequest
      : urlOrRequest instanceof Request
        ? new URL(urlOrRequest.url).toString()
        : urlOrRequest.toString();

  if (url.includes("?") || !_searchParams) return url;

  const searchParams =
    _searchParams instanceof Request
      ? new URL(_searchParams.url).searchParams
      : _searchParams;

  return `${url}?${searchParams}`;
}

/** To be thrown in component routes */
export function throwRedirect(
  urlOrRequest: string | Request | URL,
  responseInit?: ResponseInit,
): never {
  throw redirectResponse(urlOrRequest, responseInit);
}

/** To be used in resource routes */
export function redirectResponse(
  urlOrRequest: string | Request | URL,
  responseInit?: ResponseInit,
): Response {
  const headers = new Headers(responseInit?.headers);
  headers.set("Location", createUrlWithSearchParams(urlOrRequest));

  return new Response(null, {
    status: responseInit?.status ?? HttpStatusCode.Found,
    headers,
  });
}

export function throwSafeRedirect(
  redirectUrl: URL | string,
  currentUrl: URL | string,
  response?: ResponseInit,
): void {
  // External
  if (typeof redirectUrl === "string" && redirectUrl.startsWith("http")) {
    throw throwRedirect(redirectUrl, response);
  }

  const { pathname: currentPathname } =
    currentUrl instanceof URL
      ? currentUrl
      : currentUrl.startsWith("http")
        ? new URL(currentUrl)
        : { pathname: currentUrl };

  const { pathname: redirectPathname } =
    redirectUrl instanceof URL ? redirectUrl : { pathname: redirectUrl };

  if (!currentPathname.startsWith(redirectPathname)) {
    throw throwRedirect(redirectPathname, response);
  }
}

export function mergeToResponseHeaders(
  ...sources: Array<
    { headers: Headers; methodSet: boolean } | Headers | undefined
  >
): Headers {
  const headers = new Headers();
  for (const source of sources) {
    if (source && !isObject(source)) {
      throw new TypeError("All arguments must be of type object");
    }
    const sourceHeaders: Headers | null = source
      ? "methodSet" in source
        ? "headers" in source && typeof source.headers === "object"
          ? source.headers
          : null
        : source
      : null;

    if (!sourceHeaders) continue;

    const methodSet = source
      ? "methodSet" in source
        ? source.methodSet === true
        : false
      : false;
    for (const [key, value] of sourceHeaders.entries()) {
      if (value === undefined || value === "undefined") {
        headers.delete(key);
      } else {
        headers[methodSet ? "set" : "append"](key, value);
      }
    }
  }

  return headers;
}

function isObject(value: unknown) {
  return value !== null && typeof value === "object";
}

export function methodNotAllowedResponse(method: string, data?: object) {
  return Response.json(
    { message: `HTTP Method '${method}' is not supported`, ...data },
    { status: HttpStatusCode.MethodNotAllowed },
  );
}
