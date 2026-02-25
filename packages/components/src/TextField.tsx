import { forwardRef } from "react";
import { cn } from "@innbell/utils/cn";
import { Field, type FieldProps } from "./Field";

type TextFieldType =
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "number"
  | "password"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type TextFieldProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type" | "prefix"
> &
  Omit<FieldProps, "children"> & {
    type?: TextFieldType;
    fieldClassName?: string;
    children?: React.ReactNode;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
  };

export const TextField = forwardRef(function TextField(
  {
    label,
    description,
    errorMessage,
    inlineLabel,
    fieldClassName,
    children,
    suffix,
    prefix,
    ...props
  }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Field
      id={props.id}
      label={label}
      description={description}
      errorMessage={errorMessage}
      required={props.required}
      inlineLabel={inlineLabel}
      className={fieldClassName}
      name={props.name}
      suffix={suffix}
    >
      <div className="relative w-full">
        {prefix}
        <input
          {...props}
          className={cn(
            "peer flex h-9 w-full min-w-[160px] rounded-md border border-input bg-transparent px-2 py-1 shadow-sm transition-colors focus:bg-input",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:select-none",
            props.className,
          )}
          ref={ref}
        />
      </div>

      {children}
    </Field>
  );
});
