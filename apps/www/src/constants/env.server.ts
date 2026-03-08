import { z } from "zod";

// TODO: isolatedDeclarations
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  SESSION_SECRET: z.string().min(1),

  VAPID_PRIVATE_KEY: z.string().min(1).optional(),
  _VAPID_PUBLIC_KEY: z.string().min(1).optional(),

  CF_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  CF_TURNSTILE_SECRET: z.string().min(1).optional(),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .optional(),
});

export const env: Env = envSchema.parse(process.env);

export default env;

export type Env = z.infer<typeof envSchema>;
export type EnvKey = keyof Env;
export type ClientEnvKey = Extract<EnvKey, `_${string}`>;
export type ClientEnv = Pick<Env, ClientEnvKey>;

/**
 * The `clientEnv` constant is an object that represents the subset of environment
 * variables intended for the client-side. It is constructed by filtering the full
 * `env` object to include only properties that begin with an underscore `_`.
 *
 * The `Object.keys(env).filter(...)` chain creates an array of keys from `env` that
 * start with an underscore, which are considered client-side keys. This array is then
 * reduced into a new object (`ClientEnv`), where each key is assigned its corresponding
 * value from the `env` object, or an empty string if the value is undefined.
 *
 * The resulting `clientEnv` object contains only the client-side environment variables.
 */
export const clientEnv: ClientEnv = Object.keys(env)
  .filter((key) => key.startsWith("_"))
  // eslint-disable-next-line - no-array-reduce
  .reduce((acc, key) => {
    acc[key as ClientEnvKey] = env[key as EnvKey] || "";
    return acc;
  }, {} as ClientEnv);

export const __ENV_TEST__ =
  process.env["VITEST"] || process.env["E2E"] || env.NODE_ENV === "test";
export const __ENV_DEV__ = env.NODE_ENV === "development";
