import { z } from "zod";

// Login form validation
export const loginSchema = z.object({
    email: z.string().min(1, "Please enter a valid username"),
    password: z.string().min(4, "Password must be at least 4 characters"),
});


export const registerSchema = z.object({
    email: z.string().min(1, "Please enter a valid username"),
    username: z.string().min(1, "Please enter a valid username"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    password2: z.string().min(4, "Password must be at least 4 characters"),
});