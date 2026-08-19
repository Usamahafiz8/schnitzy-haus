import { z } from "zod";

export const cartItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(20),
  notes: z.string().trim().max(300).optional().or(z.literal("")),
});

export const orderSchema = z.object({
  customerName: z.string().trim().min(1, "Please enter your name.").max(100),
  phone: z.string().trim().min(5, "Please enter a valid phone number.").max(30),
  email: z.string().trim().email("Please enter a valid email."),
  pickupTime: z.string().min(1, "Please choose a pickup time."),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  locale: z.enum(["de", "en"]),
  items: z.array(cartItemSchema).min(1, "Your cart is empty."),
});

export type OrderInput = z.infer<typeof orderSchema>;
