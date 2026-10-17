import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
});

export const loginSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
