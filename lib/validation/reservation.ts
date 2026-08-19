import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  phone: z.string().trim().min(5, "Please enter a valid phone number.").max(30),
  email: z.string().trim().email("Please enter a valid email."),
  date: z.string().min(1, "Please choose a date."),
  timeSlot: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Please choose a valid time."),
  partySize: z.coerce.number().int().min(1).max(50),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  locale: z.enum(["de", "en"]),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
