import { Suspense } from "react";
import { Await, type AwaitProps } from "react-router";
import type { data, MetaFunction } from "react-router";
import { appMetaItems } from "~/constants/meta-links";

export type { To as LinkTo } from "react-router";
export type DataWithResponseInit<D> = ReturnType<typeof data<D>>;

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
