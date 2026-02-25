import { createHash, randomBytes } from "node:crypto";

export function createTempPassword(data: string, length = 8): string {
  return createHash("sha256").update(data).digest("hex").slice(0, length);
}

export function createNonce() {
  return randomBytes(16).toString("hex");
}
