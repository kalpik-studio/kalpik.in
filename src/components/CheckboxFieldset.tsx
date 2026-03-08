import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "~/utils/cn";
import { Field } from "./Field";

export type CheckboxFieldsetOption = {
  id?: string;
  value?: string;
  label?: React.ReactNode;
  name?: string;
};

export type CheckboxFieldsetProps<T extends CheckboxFieldsetOption> = {
  options: T[];
  selectedOptions?: T[];
  name: string;
  required?: boolean;
  label: string;
  preChildren?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
};

export function CheckboxFieldset<T extends CheckboxFieldsetOption>({
  options: allOptions,
  selectedOptions,
  name,
  label,
  children,
  preChildren,
  required,
  className,
  description,
}: CheckboxFieldsetProps<T>) {
  const checkIfSelected = useCallback(
    (option: CheckboxFieldsetOption) => {
      if (!selectedOptions || selectedOptions.length === 0) return false;

      return selectedOptions.some((s) => {
        if (option.value !== undefined) return s.value === option.value;
        if (option.id !== undefined) return s.id === option.id;
        return false;
      });
    },
    [selectedOptions],
  );

  return (
    <Field
      label={label}
      className="min-w-0 @container "
      required={required}
      fieldset
      description={description}
      name={name}
    >
      {preChildren}

      {selectedOptions?.length === 0 ? (
        <input type="hidden" name={name} value={""} />
      ) : null}

      <div
        className={cn("grid gap-2 @xs:grid-cols-2 @lg:grid-cols-3", className)}
      >
        {allOptions.map((option) => (
          <label
            key={option.value || option.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              className="h-4 w-4 min-h-4 min-w-4"
              name={name}
              value={option.value || option.id}
              defaultChecked={checkIfSelected(option)}
            />
            {option.label || option.name || option.id}
          </label>
        ))}
      </div>

      {children}
    </Field>
  );
}

export function CheckboxControlledFieldset<T extends CheckboxFieldsetOption>({
  options: allOptions,
  selectedOptions,
  name,
  label,
  children,
  preChildren,
  required,
  selectAllOption,
  selectAllBlock,
  description,
  className,
}: CheckboxFieldsetProps<T> & {
  selectAllOption?: boolean | string;
  selectAllBlock?: boolean;
}) {
  const { checkIfSelected, isAllSelected, setSelected, selected } =
    useCheckboxState({
      allOptions,
      selectedOptions,
    });

  const selectAllButton =
    selectAllOption && allOptions.length > 0 ? (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={isAllSelected}
          onChange={() => {
            if (isAllSelected === true) return setSelected([]);
            return setSelected(allOptions);
          }}
        />
        {typeof selectAllOption === "string"
          ? selectAllOption
          : isAllSelected === true
            ? "Deselect all"
            : "Select all"}
      </label>
    ) : null;

  return (
    <Field
      name={name}
      label={label}
      className="min-w-0 @container "
      required={required}
      suffix={!selectAllBlock && selectAllButton}
      fieldset
      description={description}
    >
      {selectAllBlock && selectAllButton}

      {preChildren}

      {isAllSelected === false ? (
        <input type="hidden" name={name} value={""} />
      ) : null}

      <div
        className={cn("grid @xs:grid-cols-2 @lg:grid-cols-3", className)}
        key={selected.toString()}
      >
        {allOptions.map((option) => (
          <label
            key={option.value || option.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              className="h-4 w-4"
              name={name}
              value={option.value || option.id}
              defaultChecked={checkIfSelected(option)}
              onChange={(e) => {
                const value = e.target.value || "";
                const checked = checkIfSelected({ value });

                setSelected((options) => {
                  return checked
                    ? options.filter((o) => o.value !== value && o.id !== value)
                    : [...options, { value }];
                });
              }}
            />
            {option.label || option.name || option.id}
          </label>
        ))}
      </div>

      {children}
    </Field>
  );
}

function useCheckboxState({
  selectedOptions,
  allOptions,
}: {
  allOptions: CheckboxFieldsetOption[];
  selectedOptions?: CheckboxFieldsetOption[];
}) {
  const [selected, setSelected] = useState<CheckboxFieldsetOption[]>(
    () => selectedOptions || [],
  );
  useEffect(
    () =>
      setSelected((options) => {
        if (!selectedOptions) return [];
        if (options.length === selectedOptions.length) return options;
        return selectedOptions;
      }),
    [selectedOptions],
  );

  const isAllSelected: boolean = useMemo(
    () => checkIsAllSelected(allOptions, selected),
    [allOptions, selected],
  );

  const checkIfSelected = useCallback(
    (option: CheckboxFieldsetOption) => {
      if (selected.length === 0) return false;

      return selected.some((s) => {
        if (option.value !== undefined) return s.value === option.value;
        if (option.id !== undefined) return s.id === option.id;
        return false;
      });
    },
    [selected],
  );

  return { selected, isAllSelected, checkIfSelected, setSelected };
}

function checkIsAllSelected<T extends CheckboxFieldsetOption>(
  allOptions: T[],
  selectedOptions?: T[] | string[],
): boolean {
  // if (
  //   !selectedOptions ||
  //   selectedOptions.length === 0 ||
  //   allOptions.length === 0
  // ) {
  //   return false;
  // }

  // if (selectedOptions.length !== allOptions.length) {
  //   return "indeterminate";
  // }

  return (selectedOptions?.length || 0) === allOptions.length;
}
