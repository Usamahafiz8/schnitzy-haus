import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email."),
  password: z.string().min(1, "Please enter your password."),
});

export const staffCreateSchema = z.object({
  name: z.string().trim().min(1, "Please enter a name.").max(100),
  email: z.string().trim().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["ADMIN", "STAFF"]),
});
