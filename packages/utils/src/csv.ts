import { CsvError, parse, type Info, type Options } from "csv-parse";

export type CsvInputObject = { [key: string]: string };

/**
 * Creates a `Response` object with CSV content.
 *
 * The `csv` function takes an array of objects or a CSV string, an optional filename, and an optional `ResponseInit` object.
 * It sets the appropriate headers for downloading a CSV file and returns a `Response` object containing the CSV data.
 *
 * @param array - An array of objects conforming to `CsvInputObject` or a CSV string to be returned as the response body.
 * @param filename - An optional filename for the downloaded CSV file, defaults to a timestamped filename.
 * @param init - An optional `ResponseInit` object to customize the response.
 * @returns A `Response` object with the CSV data and headers set for download.
 */
export function csv<T extends CsvInputObject>(
  array: T[] | string,
  filename: string = `innbell-download-${new Date().toString()}`,
  init?: ResponseInit,
): Response {
  if (init === undefined) init = {};
  const responseInit = typeof init === "number" ? { status: init } : init;

  const headers = new Headers(responseInit.headers);
  headers.set("Content-Type", "text/csv; charset=utf8");
  if (filename) {
    headers.set(
      "Content-Disposition",
      `attachment; filename="${filename}.csv"`,
    );
  }

  return new Response(typeof array === "string" ? array : arrayToCsv(array), {
    ...responseInit,
    headers,
  });
}

/**
 * Converts an array of objects into a CSV formatted string.
 * Each object in the array represents a row in the CSV, and each property on the object represents a cell.
 * The keys of the first object in the array are used as the column headers for the CSV.
 * Values are enclosed in double quotes, and rows are separated by CRLF (`\r\n`).
 *
 * @param array - An array of objects to be converted into CSV format.
 * @returns A string representing the CSV with headers followed by the data rows.
 */
function arrayToCsv<T extends CsvInputObject>(array: T[]): string | undefined {
  const itemForKeys = array.find((item) => !!item);
  if (!itemForKeys) return undefined;

  const keys = Object.keys(itemForKeys);
  const lineSeparator = "\r\n";

  return (
    keys.join(",") +
    lineSeparator +
    array
      .map((obj) => keys.map((key) => `"${obj[key] || ""}"`).join(","))
      .join(lineSeparator)
  );
}

/**
 * Parses CSV input data and returns it as raw data along with metadata.
 *
 * This function takes a string or a `File` object containing CSV data and returns a promise that resolves with an object
 * containing a success flag, information about the CSV parsing, the columns derived from the CSV, and the parsed records.
 * The function handles various checks, such as ensuring the input is not null, the file is not empty or too large,
 * and the file type is correct. It utilizes the `csv-parse` library's `parse` function to perform the actual parsing.
 *
 * @param input - A string or `File` object containing the CSV data to be parsed.
 * @returns A promise that resolves with an object containing parsing success status, parsing info, columns, and records.
 *          The promise is rejected with an error message if any validation fails or if parsing errors occur.
 */
export async function parseCSVInputAsRawData<
  T extends CsvInputObject = CsvInputObject,
>(
  input: string | File | null,
): Promise<{
  success: true;
  info: Info;
  columns: (keyof T)[];
  records: T[];
}> {
  if (input === null) throw new Error("No input provided");
  if (input instanceof File) {
    if (input.size === 0) throw new Error("Empty file provided");
    if (input.size > 1024 * 1024)
      throw new Error("File too large. Max size 1MB.");
    if (input.type !== "text/csv")
      throw new Error("Invalid file type provided");
  }

  const options: Options = {
    delimiter: ",",
    columns: true,
    trim: true,
    skipEmptyLines: true,
    // skipRecordsWithEmptyValues: true,
    // skipRecordsWithError: true,
    encoding: "utf8",
  };

  const strData = typeof input === "string" ? input : await input.text();

  return new Promise<{
    success: true;
    info: Info;
    columns: (keyof T)[];
    records: T[];
  }>((resolve, reject) => {
    parse(strData, options, (error, records, info) => {
      if (error) {
        return reject(
          error instanceof CsvError
            ? `Code: ${error.code}. ${error.message}`
            : error,
        );
      }

      return resolve({
        success: true,
        info,
        records,
        columns: extractColumnsFromInfo<T>(info),
      });
    });
  });
}

function extractColumnsFromInfo<T extends CsvInputObject>(
  info: Info,
): (keyof T)[] {
  if (typeof info.columns === "boolean") return [];
  if (!Array.isArray(info.columns)) return [];
  return info.columns.map((col) => ("name" in col ? col.name : ""));
}
