import { z } from "zod";

// TODO: fix isolatedDeclarations
export const toastMessageSchema = z.object({
  id: z.string().optional(),
  message: z.string(),
  type: z
    .custom<"info" | "success" | "error" | "warning" | "loading">()
    .optional(),
  description: z.string().optional(),
  linkLabel: z.string().optional(),
  linkUrl: z.string().optional(),
  duration: z.number().optional(),
  dismissible: z.boolean().optional(),
  closeButton: z.boolean().optional(),
});

export const flashSessionValuesSchema = z.object({
  toast: toastMessageSchema,
});

export type ToastMessage = z.infer<typeof toastMessageSchema>;
