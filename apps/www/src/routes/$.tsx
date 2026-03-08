import { handleRedirects } from "react-router/redirects";
import { genWwwRoute } from "react-router/routes";
import { createMetaFunction } from "react-router/utils";
import { ButtonLink } from "~/components/Button.tsx";
import { Icon, IconName } from "~/components/Icon.tsx";
import type { Route } from "./+types/$";

export const meta = createMetaFunction("Error");

export function loader(loaderArgs: Route.LoaderArgs) {
  return handleRedirects(loaderArgs);
}

export const links: Route.LinksFunction = () => {
  return [{ rel: "canonical", href: genWwwRoute() }];
};

export default function Splat() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-black p-8 py-96 text-white">
      <div className="flex max-w-60 flex-col gap-4">
        <h2 className="text-2xl font-bold">An error occurred.</h2>
        <p>Most likely the page that you visited does not exist.</p>
        <ButtonLink to="..">
          <Icon name={IconName.CHEVRON_LEFT} />
          Go back
        </ButtonLink>
      </div>
    </div>
  );
}
