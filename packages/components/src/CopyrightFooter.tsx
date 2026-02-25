import { WwwRoute } from "@innbell/router/routes";
import { cn } from "@innbell/utils/cn";

export function CopyrightFooter({ className }: { className?: string }) {
  return (
    <div className={cn("text-sm text-muted-foreground w-full", className)}>
      <span className="whitespace-normal mr-2">
        <strong>InnBell</strong> © 2024 Affinity Hospitality Solutions LLP
      </span>{" "}
      <a
        className="whitespace-nowrap mr-2 underline"
        target="_blank"
        href={WwwRoute.PRIVACY_POLICY}
        rel="noreferrer"
      >
        Privacy Policy
      </a>{" "}
      <a
        className="whitespace-nowrap underline"
        target="_blank"
        href={WwwRoute.CONTACT}
        rel="noreferrer"
      >
        Contact us
      </a>
    </div>
  );
}
