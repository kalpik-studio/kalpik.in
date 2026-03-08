import { z } from "zod";
import { parseErrorMessage } from "./error";

export type ParsedError = {
  errorMessage: string;
  errors?: Record<string, string>;
};

const pocketBaseErrorResponseDataSchema = z.record(
  z.object({ code: z.string(), message: z.string() }),
);

type ClientResponseError = Error & {
  response?: { message: string; data?: { code: string; message: string } };
};

export function parsePocketBaseErrorMessage(error: unknown): ParsedError {
  if (error instanceof Error && error.name.includes("ClientResponseError")) {
    return parsePocketBaseError(error);
  }

  return { errorMessage: parseErrorMessage(error) };
}

function parsePocketBaseError(error: ClientResponseError): ParsedError {
  const response = error.response;
  if (!response) {
    return { errorMessage: error.message };
  }

  const errors: Record<string, string> = {};
  const errorMessage = generatePocketBaseErrorMessage("", {
    code: "response",
    message: response["message"],
  });

  const parsedData = pocketBaseErrorResponseDataSchema.safeParse(
    response["data"],
  );
  if (parsedData.success) {
    for (const [key, value] of Object.entries(parsedData.data)) {
      errors[key] = generatePocketBaseErrorMessage(key, value);
    }
  }

  return { errorMessage, errors };
}

function generatePocketBaseErrorMessage(
  key: string,
  value: { code?: string; message: string },
): string {
  switch (value.code) {
    case "validation_values_mismatch": {
      if (key.includes("password")) {
        return "The passwords do not match each other.";
      }
      return "This value does not match with the other.";
    }

    case "response": {
      if (value.message === "Failed to authenticate.") {
        return "Either 'email' or 'password' or both are incorrect.";
      }
      return value.message;
    }

    case "validation_invalid_mime_type": {
      return `Type of '${key}' ${value.message.split("mime type")[1]}`;
    }

    default: {
      return value.message;
    }
  }
}
