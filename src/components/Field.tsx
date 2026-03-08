import { useId } from "react";
import { useActionData } from "react-router";
import { cn } from "~/utils/cn";
import type { DataError } from "~/utils/response.server";

export type FieldProps = {
  id?: string | undefined;
  label: string;
  name: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
  required?: boolean | undefined;
  description?: React.ReactNode | undefined;
  suffix?: React.ReactNode | undefined;
  errorMessage?: string | undefined;
  inlineLabel?: boolean | undefined;
  labelClassName?: string | undefined;
  fieldset?: boolean | undefined;
};

export function Field({
  id,
  label,
  name,
  children,
  className,
  required,
  description,
  errorMessage: _errorMessage,
  inlineLabel,
  labelClassName,
  suffix,
  fieldset,
}: FieldProps): JSX.Element {
  const actionData = useActionData<DataError>();
  const reactId = useId();
  const uuid = id || reactId;
  const fieldId = `${uuid}-field`;
  const labelId = `${uuid}-label`;
  const descriptionId = `${uuid}-description`;
  const errorMessageId = `${uuid}-error`;
  const TagName = fieldset ? "fieldset" : "label";

  const errorMessage =
    _errorMessage ?? (name ? actionData?.errors?.[name] : undefined);

  return (
    <TagName
      id={fieldId}
      className={cn("relative flex flex-col gap-1", className)}
      htmlFor={id}
      aria-labelledby={
        errorMessage ? errorMessageId : description ? descriptionId : labelId
      }
      aria-invalid={!!errorMessage}
      aria-errormessage={errorMessage ? errorMessageId : undefined}
      data-required={required}
    >
      <div className="relative flex items-end justify-between">
        <div
          className={cn(
            "block font-medium leading-none text-muted-foreground",
            "text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            inlineLabel
              ? "absolute -top-1.5 left-1 z-[1] bg-background px-1 leading-3"
              : "text-sm text-foreground",
            labelClassName,
          )}
        >
          <span id={labelId}>{label}</span>
          {required && label ? (
            <span
              className="text-red-600 dark:text-red-400"
              title="The field is required."
            >
              {" *"}
            </span>
          ) : null}
        </div>

        {!inlineLabel && suffix}
      </div>

      {children}

      {errorMessage ? (
        <p
          id={errorMessageId}
          className={cn(
            "m-0 text-sm text-red-600 dark:text-red-400",
            inlineLabel ? "px-2" : "",
          )}
          role="alert"
        >
          {errorMessage}
        </p>
      ) : description ? (
        <p
          id={descriptionId}
          className={cn(
            "m-0 text-sm text-muted-foreground",
            inlineLabel ? "px-2" : "",
          )}
        >
          {description}
        </p>
      ) : null}
    </TagName>
  );
}
