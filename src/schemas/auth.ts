import { z } from "zod";
import { UK_MOBILE_REGEX } from "@/constants/validation";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  mobileNumber: z
    .string()
    .trim()
    .regex(
      UK_MOBILE_REGEX,
      "Please enter a valid UK mobile number (e.g. 07123456789 or +447123456789).",
    ),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// UK phone regex supporting both mobiles (07xxx, +447xxx) and landlines/business lines (01xxx, 02xxx, 03xxx, 08xxx, +441xxx, +442xxx, etc.)
export const UK_PHONE_REGEX = /^(?:(?:\+44\s?|0)(?:[1-9]\d{8,9}|7\d{9}))$/;

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters."),
  companyRegistrationNumber: z.string().trim().optional(),
  vatNumber: z.string().trim().optional(),
  registeredAddress: z
    .object({
      streetAddress: z.string().trim().optional(),
      building: z.string().trim().optional(),
      city: z.string().trim().optional(),
      postalCode: z.string().trim().optional(),
    })
    .optional(),
  directorDetails: z
    .object({
      name: z.string().trim().optional(),
      phone: z
        .string()
        .trim()
        .refine(
          (val) => !val || UK_PHONE_REGEX.test(val.replace(/\s+/g, "")),
          "Please enter a valid UK phone number (e.g. 020 7123 4567 or 07123456789).",
        )
        .optional(),
      email: z
        .string()
        .trim()
        .email("Please enter a valid email address.")
        .or(z.literal(""))
        .optional(),
      address: z.string().trim().optional(),
    })
    .optional(),
  accountsPayable: z
    .object({
      name: z.string().trim().optional(),
      phone: z
        .string()
        .trim()
        .refine(
          (val) => !val || UK_PHONE_REGEX.test(val.replace(/\s+/g, "")),
          "Please enter a valid UK phone number (e.g. 020 7123 4567 or 07123456789).",
        )
        .optional(),
      email: z
        .string()
        .trim()
        .email("Please enter a valid email address.")
        .or(z.literal(""))
        .optional(),
    })
    .optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
