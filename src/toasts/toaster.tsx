import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { Icon, IconName } from "~/components/Icon.tsx";
import { cn } from "~/utils/cn";

const toasterIcons: ToasterProps["icons"] = {
  loading: <Icon name={IconName.LOADER_2} className="animate-spin" />,
};

export type { ToasterProps };

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      cn={cn}
      richColors
      offset={"0.5rem"}
      theme="system"
      visibleToasts={5}
      icons={toasterIcons}
      {...props}
    />
  );
}
