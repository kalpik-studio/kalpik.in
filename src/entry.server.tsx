import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter } from "react-router";
import type { AppLoadContext, EntryContext } from "react-router";
import { NonceProvider } from "~/contexts/nonce-context";
import { createNonce } from "~/utils/crypto.server";

export const streamTimeout = 5000;
const ABORT_DELAY = 10_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  _loadContext: AppLoadContext,
): Promise<unknown> {
  const userAgent = request.headers.get("user-agent");
  const isBot = isbot(userAgent);
  const nonce = createNonce();

  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const onReady = () => {
      shellRendered = true;
      const body = new PassThrough();
      const stream = createReadableStreamFromReadable(body);

      responseHeaders.set("Content-Type", "text/html");

      resolve(
        new Response(stream, {
          headers: responseHeaders,
          status: responseStatusCode,
        }),
      );

      pipe(body);
    };

    const onError = (error: unknown) => {
      responseStatusCode = 500;
      // Log streaming rendering errors from inside the shell.  Don't log
      // errors encountered during initial shell rendering since they'll
      // reject and get logged in handleDocumentRequest.
      if (shellRendered) {
        reportError(error);
      }
    };

    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider nonce={nonce}>
        <ServerRouter
          context={reactRouterContext}
          url={request.url}
          nonce={nonce}
        />
      </NonceProvider>,
      {
        onAllReady: isBot ? undefined : onReady,
        onShellReady: isBot ? onReady : undefined,
        onShellError: reject,
        onError,
        nonce,
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
