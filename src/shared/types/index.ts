import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z.string().min(1, "Imię jest wymagane"),
    email: z
      .string()
      .optional()
      .refine((v) => !v || /^[^s@]+@[^s@]+.[^s@]+$/.test(v), "Nieprawidłowy adres email"),
    phone: z.string().optional(),
    message: z.string().min(1, "Wiadomość jest wymagana").min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
    eventType: z.string().optional(),
    eventDate: z.string().optional(),
  })
  .refine((d) => Boolean(d.email?.trim() || d.phone?.trim()), {
    message: "Podaj e-mail lub telefon",
    path: ["email"],
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const postSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  slug: z.string().min(1, "Slug jest wymagany"),
  content: z.string().min(1, "Treść jest wymagana"),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type PostFormData = z.infer<typeof postSchema>;
