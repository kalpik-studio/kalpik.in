import { cn } from "@innbell/utils/cn";
import { CommandLoading, Command as CommandPrimitive } from "cmdk";
import React from "react";
import type { ComboboxOption } from "./Combobox";
import { Icon, IconName } from "./Icon";
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export type SearchBarProps = {
  options: ComboboxOption[];
  defaultValue?: string;
  onSelect?: (option: ComboboxOption) => void;
  loading?: boolean;
};

export function SearchBar({
  options,
  defaultValue,
  loading,
  onSelect,
}: SearchBarProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const handleSelect = React.useCallback(
    (option: ComboboxOption) => {
      setValue(String(option.value));
      setOpen(false);
      onSelect?.(option);
    },
    [onSelect],
  );

  const placeholder = "Search all products and services...";

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor className="relative -top-1" />
        <PopoverTrigger className="w-full">
          <SearchBarInputButton placeholder={placeholder} />
        </PopoverTrigger>
        <PopoverContent
          className="p-0 shadow-xl"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command>
            <SearchBarCommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {loading && <CommandLoading>Searching</CommandLoading>}

              {options.map((option) => (
                <CommandItem
                  key={String(option.value)}
                  value={String(option.label)}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center justify-between !opacity-80"
                >
                  <span>{option.label}</span>

                  <Icon
                    name={IconName.CHECK}
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SearchBarInputButton({ placeholder }: { placeholder: string }) {
  return (
    <div
      className={cn("flex items-center rounded-md border px-4 py-2 bg-card")}
    >
      <Icon
        name={IconName.SEARCH}
        className="mr-2 h-4 w-4 shrink-0 opacity-50"
      />
      <div
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm text-muted-foreground outline-none",
          "cursor-text items-center truncate text-left",
        )}
      >
        {placeholder}
      </div>
    </div>
  );
}

const SearchBarCommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex items-center border-b px-4 py-2")}
      // eslint-disable-next-line - no-unknown-property
      cmdk-input-wrapper=""
    >
      <Icon
        name={IconName.SEARCH}
        className="mr-2 h-4 w-4 shrink-0 opacity-50"
      />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground",
          className,
        )}
        {...props}
      />
    </div>
  );
});
SearchBarCommandInput.displayName = "SearchBarCommandInput";
