import { ImagePicker } from "./ImagePicker";
import { TextField } from "./TextField";

export function CompanyFieldset({
  rating,
  gstin,
  logo,
  name,
  website,
}: {
  rating?: number;
  name?: string;
  website?: string;
  gstin?: string;
  logo?: string;
}) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-4">
      <legend className="mb-2 text-lg">Company details</legend>
      <input type="hidden" name="rating" value={(rating || 3).toFixed(1)} />

      <TextField
        label="Company name"
        name="name"
        type="text"
        required
        defaultValue={name}
        minLength={3}
        autoComplete="organization"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Company website"
          name="website"
          type="url"
          required
          placeholder="https://example.com"
          defaultValue={website || "https://"}
          autoComplete="url"
        />
        <GSTINField defaultValue={gstin} />
      </div>

      <ImagePicker label="Company logo" name="logo" defaultValue={logo} />
    </fieldset>
  );
}

function GSTINField({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <TextField
      label="GSTIN"
      name="gstin"
      type="text"
      required
      defaultValue={defaultValue}
      minLength={15}
      maxLength={15}
      placeholder="Eg. 22AAAAA0000A1Z1"
      onInput={transformValueToUppercase}
      description={
        <>
          15 characters.{" "}
          <a
            href="https://simple.wikipedia.org/wiki/GSTIN"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Learn more
          </a>
          .
        </>
      }
    />
  );
}

function transformValueToUppercase(event: React.FormEvent<HTMLInputElement>) {
  const element = event.currentTarget;
  element.value = element.value.toUpperCase();
}
