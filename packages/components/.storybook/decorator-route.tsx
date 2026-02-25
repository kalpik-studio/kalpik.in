import type { Decorator } from "@storybook/react";
import { createRoutesStub } from "@innbell/router";
import type { CustomParameters } from "./parameters";

export const routeDecorator: Decorator = (Component, ctx) => {
  const { route }: CustomParameters = ctx.parameters;

  const routesStub = createRoutesStub([
    {
      path: "/*",
      action: route?.action ?? (() => route?.actionData ?? null),
      loader: route?.loader ?? (() => route?.loaderData ?? null),
      meta: route?.meta ?? undefined,
      Component,
    },
  ]);

  return routesStub({
    initialEntries: ["/"],
    future: {},
  });
};
