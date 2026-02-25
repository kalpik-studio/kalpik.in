import { cn } from "@innbell/utils/cn";
import * as React from "react";
import { Field, type FieldProps } from "./Field";
import { Icon, IconName } from "./Icon";
import type { SelectOption } from "./Select";
import { ButtonUI } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type ComboboxOption = SelectOption;

type ComboboxCommonProps = Omit<FieldProps, "children"> & {
  name?: string;
  defaultLabel?: string;
  options: ComboboxOption[];
  widthSize?: "trigger" | "default";
};

export type ComboboxProps = ComboboxCommonProps & {
  defaultValue?: string;
  onSelect?: (option: ComboboxOption | undefined) => void;
};

export function Combobox({
  label,
  options,
  className,
  defaultLabel,
  defaultValue = "",
  name,
  onSelect,
  widthSize,
  ...rest
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(() => defaultValue);

  const selectedOptions = React.useMemo(
    () => options.filter((option) => value === option.value.toString()),
    [value, options],
  );

  return (
    <Field
      {...rest}
      label={rest.inlineLabel ? (value ? label : "") : label}
      name={name}
    >
      {name ? (
        <input
          type="hidden"
          name={name}
          value={value}
          required={rest.required}
        />
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <ComboboxTrigger
          label={label}
          defaultLabel={defaultLabel}
          open={open}
          className={className}
          hasAValue={!!value}
          selectedOptions={selectedOptions}
        />

        <PopoverContent
          className="p-0"
          style={{
            width:
              widthSize === "trigger"
                ? "var(--radix-popover-trigger-width)"
                : undefined,
          }}
        >
          <Command>
            <CommandInput placeholder="Search..." />

            {value ? (
              <CommandItem
                onSelect={() => {
                  setValue("");
                  setOpen(false);
                  onSelect?.(undefined);
                }}
                className="text-error-foreground"
              >
                <Icon
                  name={IconName.UNDO_2}
                  size={"sm"}
                  className="mr-2 h-4 w-4"
                />
                Reset
              </CommandItem>
            ) : null}
            <CommandSeparator />

            <CommandList
              className="overflow-y-auto"
              style={{
                maxHeight:
                  "calc(var(--radix-popover-content-available-height) - 64px)",
              }}
            >
              <CommandEmpty>No match found.</CommandEmpty>

              {options.map((option) => (
                <ComboboxItem
                  key={option.label}
                  option={option}
                  value={[value]}
                  onSelect={(option) => {
                    setValue(String(option.value));
                    setOpen(false);
                    onSelect?.(option);
                  }}
                />
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export type ComboboxMultiProps = ComboboxCommonProps & {
  countLabel?: string;
  defaultValue?: (string | undefined)[];
  visibleCount?: number;
  onSelect?: (options: ComboboxOption[]) => void;
  children?: (setValues: (values: string[]) => void) => React.ReactNode;
};

export function ComboboxMulti({
  label,
  options,
  className,
  defaultLabel,
  defaultValue = [],
  name,
  onSelect,
  widthSize,
  children,
  countLabel,
  visibleCount,
  ...rest
}: ComboboxMultiProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(() =>
    defaultValue.filter(Boolean),
  );
  const hasAValue = values.length > 0;

  const selectedOptions = React.useMemo(
    () => options.filter((option) => values.includes(option.value.toString())),
    [options, values],
  );

  const handleSelect = React.useCallback(
    (option: ComboboxOption) => {
      const value = option.value.toString();
      const newValues = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      setValues(newValues.filter(Boolean));

      const selectedOptions = options.filter((option) =>
        newValues.includes(option.value.toString()),
      );
      onSelect?.(selectedOptions);
    },
    [values, options, onSelect],
  );

  const handleChange = React.useCallback(
    (newValues: string[]) => {
      setValues(newValues.filter(Boolean));

      const selectedOptions = options.filter((option) =>
        newValues.includes(option.value.toString()),
      );
      onSelect?.(selectedOptions);
    },
    [options, onSelect],
  );

  return (
    <Field
      {...rest}
      label={rest.inlineLabel ? (hasAValue ? label : "") : label}
      name={name}
    >
      {name
        ? values.map((value) => (
            <input
              key={value}
              type="hidden"
              name={name}
              value={value}
              required={rest.required}
            />
          ))
        : null}
      <Popover open={open} onOpenChange={setOpen}>
        <ComboboxTrigger
          label={label}
          defaultLabel={defaultLabel}
          open={open}
          className={className}
          hasAValue={hasAValue}
          selectedOptions={selectedOptions}
          countLabel={countLabel}
          visibleCount={visibleCount}
        />

        <PopoverContent
          className="p-0"
          style={{
            width:
              widthSize === "trigger"
                ? "var(--radix-popover-trigger-width)"
                : undefined,
          }}
        >
          <Command>
            <CommandInput placeholder="Search..." />

            {hasAValue ? (
              <>
                <CommandItem
                  onSelect={() => {
                    setValues([]);
                    setOpen(false);
                    onSelect?.([]);
                  }}
                  className="text-error-foreground"
                >
                  <Icon
                    name={IconName.UNDO_2}
                    size={"sm"}
                    className="mr-2 h-4 w-4"
                  />
                  Reset
                </CommandItem>
                <CommandSeparator />
              </>
            ) : null}

            {children ? (
              <>
                {children(handleChange)}
                <CommandSeparator />
              </>
            ) : null}

            <CommandList>
              <CommandEmpty>No match found.</CommandEmpty>

              {options.map((option) => (
                <ComboboxItem
                  key={option.label}
                  option={option}
                  value={values}
                  onSelect={handleSelect}
                />
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}

function ComboboxTrigger({
  className,
  hasAValue,
  defaultLabel,
  label,
  open,
  selectedOptions,
  countLabel = label,
  visibleCount = 2,
}: {
  className?: string;
  hasAValue?: boolean;
  defaultLabel?: string;
  label: string;
  countLabel?: string;
  open: boolean;
  visibleCount?: number;
  selectedOptions: ComboboxOption[];
}) {
  const visibleLabelWithValue =
    selectedOptions.length > visibleCount
      ? `${selectedOptions.length} ${countLabel}`
      : selectedOptions.map((option) => option.label).join(", ");

  return (
    <PopoverTrigger asChild>
      <ButtonUI
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn(
          "w-full min-w-[160px] justify-between px-2",
          !hasAValue && "text-muted-foreground",
          className,
        )}
      >
        <span className="truncate">
          {hasAValue
            ? visibleLabelWithValue
            : defaultLabel || label || "Select..."}
        </span>
        <Icon name={IconName.CHEVRONS_UP_DOWN} className="opacity-50" />
      </ButtonUI>
    </PopoverTrigger>
  );
}

function ComboboxItem({
  option,
  ...rest
}: {
  option: ComboboxOption;
  value: (string | undefined)[];
  onSelect: (option: ComboboxOption) => void;
}) {
  if (Array.isArray(option.value)) {
    return (
      <CommandGroup heading={option.label}>
        {option.value.map((subOption) => {
          return (
            <ComboboxItem key={subOption.label} option={subOption} {...rest} />
          );
        })}
      </CommandGroup>
    );
  }

  return (
    <CommandItem
      key={String(option.value)}
      value={String(option.label)}
      onSelect={() => rest.onSelect(option)}
      className="flex items-center justify-start"
    >
      <Icon
        name={IconName.CHECK}
        className={cn(
          "mr-2 h-4 w-4",
          rest.value.includes(option.value) ? "opacity-100" : "opacity-0",
        )}
      />

      {option.label}
    </CommandItem>
  );
}
