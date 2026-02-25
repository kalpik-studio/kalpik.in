import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { NonceProvider } from "@innbell/contexts/nonce";
import { ServerRouter } from "@innbell/router";
import type { AppLoadContext, EntryContext } from "@innbell/router";
import { createReadableStreamFromReadable, isbot } from "@innbell/router/node";
import { createNonce } from "@innbell/utils/crypto";

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
