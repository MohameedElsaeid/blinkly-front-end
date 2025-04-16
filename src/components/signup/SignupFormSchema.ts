
import * as z from 'zod';

export const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s\-']+$/, { message: "First name can only contain letters, spaces, hyphens, and apostrophes" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s\-']+$/, { message: "Last name can only contain letters, spaces, hyphens, and apostrophes" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email cannot exceed 255 characters" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password cannot exceed 32 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  passwordConfirmation: z.string(),
  country: z.string().min(1, { message: "Please select a country" }),
  countryCode: z.string().regex(/^\+\d{1,3}$/, { message: "Please select a valid country code" }),
  phoneNumber: z.string().min(5, { message: "Please enter a valid phone number" }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

export type FormValues = z.infer<typeof formSchema>;
