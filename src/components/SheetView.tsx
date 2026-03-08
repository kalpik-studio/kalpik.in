import { useNavigate } from "react-router";
import { cn } from "~/utils/cn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export type SheetViewProps = {
  open?: boolean;
  className?: string;
  caption?: string;
  title: React.ReactNode;
  closeLink?: string | null;
  actions?: React.ReactNode[];

  children: React.ReactNode;
  footer?: React.ReactNode;
  mainClassName?: string;

  trigger?: React.ReactNode;
};

export function SheetView({
  caption,
  title,
  children,
  footer,
  mainClassName,
  open,
  trigger,
  closeLink,
  className,
}: SheetViewProps) {
  const navigate = useNavigate();
  return (
    <Sheet
      defaultOpen={open}
      onOpenChange={(open) => {
        if (!open && closeLink) navigate(closeLink);
      }}
    >
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}

      <SheetContent
        className={cn("flex-col-4 w-[calc(100%_-_60px)]", className)}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="break-all">{caption}</SheetDescription>
        </SheetHeader>

        <main
          className={cn(
            "h-full min-h-0 flex-1 flex-col-4 overflow-y-auto print:overflow-visible",
            mainClassName,
          )}
        >
          {children}
        </main>

        {footer ? <SheetFooter>{footer}</SheetFooter> : null}
      </SheetContent>
    </Sheet>
  );
}
