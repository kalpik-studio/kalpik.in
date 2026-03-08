import { forwardRef } from "react";
import { cn } from "~/utils/cn";
import { Field, type FieldProps } from "./Field";

export type RadioGroupProps = {
  name: string;
  className?: string;
  defaultValue?: string | null;
  options: RadioOptionProps[];
} & Omit<FieldProps, "children">;

type RadioOptionProps = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
};

const RadioOption = forwardRef(function RadioOption(
  props: RadioOptionProps & {
    name: string;
    required?: boolean;
    defaultValue?: string | null;
  },
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { label, value, name, defaultValue, ...option } = props;

  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name={name}
        {...option}
        defaultChecked={defaultValue === value}
        ref={ref}
        value={value}
      />{" "}
      {label}
    </label>
  );
});

function RadioGroupWithRef(
  { name, options, className, defaultValue, ...props }: RadioGroupProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Field {...props} name={name}>
      <div className={cn("my-2 grid grid-cols-2 items-center", className)}>
        {options.map((option, index) => (
          <RadioOption
            key={option.value}
            {...option}
            name={name}
            defaultValue={defaultValue}
            required={props.required && index === 0}
            ref={ref}
          />
        ))}
      </div>
    </Field>
  );
}

export const RadioGroup = forwardRef(RadioGroupWithRef);
