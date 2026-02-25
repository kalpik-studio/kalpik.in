import { cn } from "@innbell/utils/cn";
import { forwardRef, useState } from "react";
import { Field, type FieldProps } from "./Field";
import { Icon, IconName } from "./Icon";
import { ButtonUI } from "./ui/button";

export type SelectOption = {
  label: string;
  value: string | SelectOption[];
  disabled?: boolean;
};

export type SelectProps = React.ComponentPropsWithoutRef<"select"> &
  Omit<FieldProps, "children"> & {
    options: SelectOption[];
    name: string;
    defaultValue?: string | undefined;
    defaultLabel?: string | undefined;
    disableDefaultOption?: boolean | undefined;
    fieldClassName?: string | undefined;
  };

export const Select = forwardRef(function Select(
  props: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>,
) {
  const {
    options,
    name,
    label,
    suffix,
    defaultValue,
    defaultLabel,
    className,
    description,
    errorMessage,
    inlineLabel,
    disableDefaultOption,
    labelClassName,
    fieldClassName,
    ...rest
  } = props;
  const [buttonLabel, setButtonLabel] = useState(() =>
    findLabel(options, rest.value?.toString() || defaultValue),
  );

  const fieldLabel = !inlineLabel || buttonLabel ? label : "";

  return (
    <Field
      id={rest.id}
      label={fieldLabel}
      description={description}
      errorMessage={errorMessage}
      required={rest.required}
      inlineLabel={inlineLabel}
      suffix={suffix}
      labelClassName={labelClassName}
      className={fieldClassName}
      name={props.name}
    >
      <div
        className={cn("grid min-w-[160px] *:col-[1/1] *:row-[1/1]", className)}
      >
        <select
          name={name}
          defaultValue={defaultValue}
          ref={ref}
          onChange={(event) =>
            setButtonLabel(findLabel(options, event.target.value))
          }
          {...rest}
          className="peer w-full rounded opacity-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="" disabled={disableDefaultOption}>
            {defaultLabel || label}
          </option>
          {options.map((option) => (
            <Option key={String(option.value)} option={option} />
          ))}
        </select>

        <ButtonUI
          aria-hidden
          tabIndex={-1}
          variant="outline"
          className="z-1 pointer-events-none w-full justify-between px-2"
          disabled={rest.disabled}
        >
          {buttonLabel || defaultLabel || label}
          <Icon
            name={IconName.CHEVRONS_UP_DOWN}
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </ButtonUI>
      </div>
    </Field>
  );
});

function Option({ option }: { option: SelectOption }) {
  const { label, value, ...rest } = option;

  if (Array.isArray(value)) {
    return (
      <optgroup label={label}>
        {value.map((option) => (
          <Option key={String(option.value)} option={option} />
        ))}
      </optgroup>
    );
  }

  return (
    <option value={value} {...rest}>
      {label}
    </option>
  );
}

function findLabel(options: SelectOption[], value: string | undefined): string {
  if (!value) return "";

  for (const option of options) {
    if (Array.isArray(option.value)) return findLabel(option.value, value);
    if (option.value === value) return option.label;
  }
  return "";
}

const booleanOptions: SelectOption[] = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export function SelectBoolean(props: Omit<SelectProps, "options">) {
  return (
    <Select
      key={props.defaultValue}
      {...props}
      inlineLabel={props.inlineLabel ?? true}
      className="min-w-[40px]"
      options={booleanOptions}
    />
  );
}
