import * as z from 'zod';

// Login form schema
export const formSchema = z.object({
    email: z.string()
        .email('Please enter a valid email address')
        .min(3, 'Email must be at least 3 characters')
        .max(255, 'Email must be less than 255 characters'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be less than 32 characters')
});

// Form data type
export type FormValues = z.infer<typeof formSchema>;
