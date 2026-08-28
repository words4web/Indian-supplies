import { z } from "zod";
import { UK_MOBILE_REGEX } from "@/constants/validation";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
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
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
