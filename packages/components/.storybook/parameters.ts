import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@innbell/router";

export interface CustomParameters {
  layout?: "centered" | "fullscreen" | "padded";
  route?: RouteParameters;
}

export interface RouteParameters {
  loader?: LoaderFunction;
  action?: ActionFunction;
  meta?: MetaFunction;
  loaderData?: object | null;
  actionData?: object | null;
}
