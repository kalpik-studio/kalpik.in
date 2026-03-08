import { forwardRef, useEffect, useState } from "react";
import { Form, Link, useNavigate, type LinkProps } from "react-router";
import { useToLinkWithSearch } from "react-router/utils";
import { useKeyDown } from "~/hooks/useKeyDown.ts";
import { submitFormWithConfirm } from "~/utils/react";
import { Icon, IconName } from "./Icon";
import { ButtonUI, type ButtonUIVariants } from "./ui/button";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ButtonUIVariants & {
    intent?: string;
  };

export const Button = forwardRef(function Button(
  { intent, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  if (intent) {
    return (
      <ButtonUI
        {...props}
        type="submit"
        name="intent"
        value={intent}
        ref={ref}
      />
    );
  }

  return <ButtonUI type="button" {...props} ref={ref} />;
});

export type ButtonLinkProps = LinkProps & {
  preserveSearch?: boolean;
  keyBinding?: string[] | string;
} & ButtonUIVariants;

export const ButtonLink = forwardRef(function ButtonLink(
  { variant, size, to, preserveSearch, keyBinding, ...props }: ButtonLinkProps,
  ref: React.Ref<HTMLAnchorElement>,
) {
  const navigate = useNavigate();
  const newTo = useToLinkWithSearch(to, preserveSearch);

  useKeyDown(
    keyBinding
      ? [
          {
            keys: keyBinding,
            handler: () => navigate(newTo),
          },
        ]
      : undefined,
  );

  return (
    <ButtonUI asChild className={props.className} variant={variant} size={size}>
      <Link {...props} to={newTo} ref={ref}>
        {props.children}
      </Link>
    </ButtonUI>
  );
});

export function ButtonForm({
  formChildren,
  onSubmit,
  ...props
}: Omit<ButtonProps, "onSubmit"> & {
  intent: string;
  formChildren?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <Form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()}>
      {formChildren}
      <Button {...props} />
    </Form>
  );
}

export function CloseButton(props: Partial<ButtonLinkProps>) {
  return (
    <ButtonLink
      title="Close"
      variant={"link"}
      size={"icon"}
      keyBinding={"Escape"}
      {...props}
      to={props.to ?? ".."}
      preserveSearch
    >
      <Icon name={IconName.CROSS} />
    </ButtonLink>
  );
}

export function DownloadButton({
  pathname,
  children,
  ...props
}: Partial<ButtonLinkProps> & { pathname: string }) {
  return (
    <ButtonLink
      variant="secondary"
      size={children ? "sm" : "icon"}
      title="Download"
      {...props}
      target="_blank"
      to={pathname}
      preserveSearch
    >
      <Icon name={IconName.DOWNLOAD} />

      {children}
    </ButtonLink>
  );
}

export function DeleteFormIconButton({
  intent,
  disabled,
  title = "Delete",
  confirmMessage,
  children,
  variant = "destructive",
}: {
  intent: string;
  disabled?: boolean;
  title?: string;
  confirmMessage?: string;
  children?: React.ReactNode;
  variant?: ButtonUIVariants["variant"];
}) {
  return (
    <ButtonForm
      intent={intent}
      formMethod="post"
      formChildren={children}
      onSubmit={submitFormWithConfirm(confirmMessage)}
      variant={variant}
      disabled={disabled}
      title={title}
      size={"icon"}
    >
      <Icon name={IconName.TRASH} />
    </ButtonForm>
  );
}

type CustomButtonLinkProps = {
  title?: string;
  to: string;
  children?: React.ReactNode;
};

export function AddButtonLink({
  title = "Add",
  to = "new",
  children,
}: Partial<CustomButtonLinkProps>) {
  return (
    <ButtonLink
      to={to}
      title={title}
      variant="secondary"
      preserveSearch
      size={children ? "default" : "icon"}
      onClick={(event) => event.stopPropagation()}
    >
      <Icon name={IconName.PLUS_CIRCLE} />
      {children}
    </ButtonLink>
  );
}

export function ViewButtonLink({ to, title = "View" }: CustomButtonLinkProps) {
  return (
    <ButtonLink
      className="text-link"
      to={to}
      title={title}
      size={"icon"}
      variant={"link"}
      onClick={(event) => event.stopPropagation()}
    >
      <Icon name={IconName.EYE} />
    </ButtonLink>
  );
}

export function EditButtonLink({ to, title = "Edit" }: CustomButtonLinkProps) {
  return (
    <ButtonLink
      className="text-link"
      to={to}
      title={title}
      size={"icon"}
      variant={"link"}
      onClick={(event) => event.stopPropagation()}
    >
      <Icon name={IconName.EDIT} />
    </ButtonLink>
  );
}

export function ResetFilterButtonLink({
  enabled,
}: {
  enabled: boolean | string | null | undefined;
}) {
  if (!enabled) return null;

  return (
    <ButtonLink to={"."} title={"Reset"} variant="secondary" size={"icon"}>
      <Icon name={IconName.UNDO_2} />
    </ButtonLink>
  );
}

export function CopyButton({
  value,
  title = "Copy",
}: {
  value: string;
  title?: string;
}) {
  const [showCheck, setShowCheck] = useState(false);

  const handleCopy = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setShowCheck(true);
    }
  };

  useEffect(() => {
    let timer: number;
    if (showCheck) {
      timer = window.setTimeout(() => {
        setShowCheck(false);
      }, 3000);
    }
    return () => window.clearTimeout(timer);
  }, [showCheck]);

  return (
    <Button
      onClick={handleCopy}
      size={"icon"}
      variant={showCheck ? "secondary" : "ghost"}
      title={title}
    >
      <Icon name={showCheck ? IconName.CHECK : IconName.COPY} />
    </Button>
  );
}
