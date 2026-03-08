import { forwardRef, useMemo, useRef, useState } from "react";
import { ONE_KB_IN_BYTES } from "~/constants/file-size";
import { cn } from "~/utils/cn";
import { formatFileSizeToReadable } from "~/utils/file-size";
import { mergeRefs } from "~/utils/react";
import { Button } from "./Button";
import { Field, type FieldProps } from "./Field";
import { Icon, IconName } from "./Icon";

export const DEFAULT_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

export type ImagePickerProps = Omit<FieldProps, "children"> & {
  name: string;
  defaultValue?: string;
  className?: string;
  maxSizeInKB?: number;
  accept?: string;
  onImageSelect?: (file: File | null, src: string) => void;
};

export const ImagePicker = forwardRef(function ImagePicker(
  {
    label,
    inlineLabel,
    description,
    errorMessage,
    id,
    required,
    defaultValue,
    name,
    className,
    maxSizeInKB,
    accept = DEFAULT_IMAGE_ACCEPT,
    onImageSelect,
  }: ImagePickerProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileSrc, setFileSrc] = useState("");
  const [error, setError] = useState(errorMessage);

  const handleClearFile = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (inputRef.current) inputRef.current.value = "";
    setFileSrc("");
    onImageSelect?.(null, "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(errorMessage);
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const src = reader.result as string;
        setFileSrc(src);
        onImageSelect?.(file, src);
      },
      { once: true },
    );

    if (maxSizeInKB && file.size > maxSizeInKB * ONE_KB_IN_BYTES) {
      setError(
        `File '${file.name}' is too big. Max size is ${formatFileSizeToReadable(maxSizeInKB)}.`,
      );
      handleClearFile();
    } else {
      reader.readAsDataURL(file);
      setError(undefined);
    }
  };

  const defaultDescription = useMemo(
    () =>
      [
        `Accepted formats: ${accept
          .split(",")
          .map((f) => f.split("/")[1])
          .join(", ")}`,
        maxSizeInKB
          ? `Max size: ${formatFileSizeToReadable(maxSizeInKB)}`
          : undefined,
      ]
        .filter(Boolean)
        .join("; "),
    [accept, maxSizeInKB],
  );

  const value = fileSrc || defaultValue;

  return (
    <Field
      label={label}
      description={description ?? defaultDescription}
      errorMessage={error}
      required={required}
      inlineLabel={inlineLabel}
      id={id}
      name={name}
    >
      <div
        className={cn(
          "overflow-hidden rounded border p-2 sm:flex items-center justify-between",
          className,
        )}
      >
        <input
          id={id}
          name={name}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          required={required}
          ref={mergeRefs(ref, inputRef)}
          multiple={false}
          className={value ? "max-w-[65%]" : undefined}
        />

        {value ? (
          <div className="flex items-center">
            <img
              src={value}
              alt={name}
              className="h-16 w-16 object-cover rounded-sm border p-1"
              onError={(e) => e.currentTarget.setAttribute("hidden", "true")}
            />
            {fileSrc && (
              <Button
                title="Clear"
                onClick={handleClearFile}
                variant={"link"}
                size={"icon"}
              >
                <Icon name={IconName.CROSS} />
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </Field>
  );
});
