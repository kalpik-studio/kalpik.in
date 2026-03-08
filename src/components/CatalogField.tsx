import { Field } from "./Field";

export function CatalogField({ catalog }: { catalog?: string }) {
  const name = "catalog";
  return (
    <Field label="Upload Catalog" name={name}>
      {catalog ? (
        <p className="mb-2 block text-sm">
          <a
            href={catalog}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Previous catalog
          </a>{" "}
          will be overwritten if you upload a new one.
        </p>
      ) : null}
      <input
        type="file"
        name={name}
        accept="text/*,image/*,application/pdf,application/json"
      />
      <p className="mt-1 block text-sm">
        Allowed file types: <strong>text files, images, PDF</strong>.
      </p>
    </Field>
  );
}
