import { Suspense } from "react";
import type { MetaFunction } from "react-router";
import { Await, useLocation, type AwaitProps } from "react-router";
import { appMetaItems } from "@innbell/constants/meta-links";
import type { LinkTo } from "./types";

export enum ResponseDataStatus {
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning",
}

export function AwaitWithSuspense<T>(
  props: AwaitProps<T> & {
    fallback?: React.ReactNode;
    callback?: (data: Awaited<T>) => void;
  },
): React.JSX.Element {
  return (
    <Suspense fallback={props.fallback}>
      <Await resolve={props.resolve} errorElement={props.errorElement}>
        {props.children}
      </Await>
    </Suspense>
  );
}

export function createMetaFunction<
  Loader = unknown,
  ParentsLoaders extends Record<string, unknown> = Record<string, unknown>,
>(title: string): MetaFunction<Loader, ParentsLoaders> {
  const appName = "InnBell";

  return ({ data, matches }) => {
    const rootLoaderData = matches.find((match) => match.id === "root")?.data;
    const pwa = !!(rootLoaderData as { pwa?: boolean })?.pwa;

    const dataTitle =
      data &&
      typeof data === "object" &&
      "title" in data &&
      typeof data.title === "string"
        ? data.title
        : undefined;

    const newTitle = pwa
      ? dataTitle
        ? `${title} - ${dataTitle}`
        : title
      : dataTitle
        ? `${title} - ${dataTitle} | ${appName}`
        : `${title} | ${appName}`;

    return [{ title: newTitle }, ...appMetaItems];
  };
}

export function parseCookieByKey<T = unknown>(
  cookie: string | null,
  key: string,
  parse: (data: string) => T = JSON.parse,
): T | null {
  if (!cookie) return null;

  try {
    const data = cookie.split(`${key}=`)[1]?.split(";")[0];
    if (!data) return null;
    return parse(data);
  } catch {
    return null;
  }
}

export function useToLinkWithSearch(
  to: LinkTo,
  preserveSearch?: boolean,
): LinkTo {
  const { search } = useLocation();

  return preserveSearch ? generateToLinkWithPreservedSearch(to, search) : to;
}

export function generateToLinkWithPreservedSearch(
  to: LinkTo,
  search: string,
): LinkTo {
  return typeof to === "string" ? { pathname: to, search } : { ...to, search };
}
