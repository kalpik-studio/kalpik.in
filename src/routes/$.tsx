import { ButtonLink } from "~/components/Button.tsx";
import { Icon, IconName } from "~/components/Icon.tsx";
import { createMetaFunction } from "~/utils/remix";

export const meta = createMetaFunction("Error");

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
