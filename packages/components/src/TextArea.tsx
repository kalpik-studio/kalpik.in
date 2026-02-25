import { cn } from "@innbell/utils/cn";
import { forwardRef, useRef } from "react";
import { Field, type FieldProps } from "./Field";

export type TextAreaProps = React.ComponentPropsWithRef<"textarea"> &
  Omit<FieldProps, "children"> & { fieldClassName?: string };

export const TextArea = forwardRef(function TextArea(
  {
    label,
    description,
    errorMessage,
    inlineLabel,
    minLength = 0,
    maxLength,
    fieldClassName,
    ...props
  }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const countRef = useRef<HTMLSpanElement>(null);

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
    >
      <div className="relative m-0 flex w-full flex-1 flex-col p-0">
        <textarea
          {...props}
          ref={ref}
          className={cn(
            "peer m-0 w-full rounded-md border border-input px-2 py-1 text-sm shadow-sm transition-colors",
            "resize-y bg-transparent placeholder:text-muted-foreground focus:bg-input",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            props.className,
          )}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(event) => {
            if (countRef.current) {
              const length = event.target.value.length;
              countRef.current.textContent = length.toString();
              countRef.current.dataset["valid"] = `${length >= minLength}`;
            }
          }}
        />

        {maxLength || minLength ? (
          <small
            aria-hidden
            className="absolute bottom-3 right-1 rounded-sm border bg-muted px-1 text-xs text-muted-foreground"
          >
            <span
              className={cn(
                "text-secondary-foreground",
                minLength && "data-[valid='false']:text-destructive",
              )}
              ref={countRef}
              data-valid={
                minLength
                  ? (props.defaultValue?.toString().length || 0) >= minLength
                  : "true"
              }
            >
              0
            </span>{" "}
            <span>/ {maxLength || "∞"}</span>
            {minLength ? <span> (min: {minLength})</span> : null}
          </small>
        ) : null}
      </div>
    </Field>
  );
});
