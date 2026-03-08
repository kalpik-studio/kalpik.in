import { isRouteErrorResponse, useRouteError } from "react-router";
import { ButtonLink } from "~/components/Button";
import { Icon, IconName } from "~/components/Icon";
import { parseErrorMessage } from "~/utils/error";

export function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  const message = parseErrorMessage(error);

  const NODE_ENV =
    // @ts-ignore window.ENV may be not defined
    (typeof window === "undefined" ? process.env : window["ENV"])["NODE_ENV"];

  return (
    <div className="mx-auto w-max p-4">
      {NODE_ENV === "development" ? (
        <pre className="max-w-screen-lg overflow-auto whitespace-pre-wrap rounded border border-red-200 p-2 text-sm text-red-500">
          ROOT {(error as Error)?.stack ?? message}
        </pre>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-8 p-8">
          <div className="flex max-w-60 flex-col gap-4">
            <h2 className="text-2xl font-bold">An error occurred.</h2>
            <p>{message}</p>
            <ButtonLink to="..">
              <Icon name={IconName.CHEVRON_LEFT} />
              Go back
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
