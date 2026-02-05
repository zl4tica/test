import { z } from "zod";

// ---------------------------
// Reusable field schemas
// ---------------------------
export const first_name = z.string().max(255);
export const last_name = z.string().max(255);
export const email = z.email();
export const password = z.string().min(8);
export const password_confirmation = z.string().min(8);
export const gender = z.enum(["male", "female"]).optional();
export const birth_date = z.date().nullable().optional();
export const wilaya = z.string().max(255).optional();

// ---------------------------
// Schemas for requests
// ---------------------------

// Register
export const RegisterSchema = z
  .object({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

// Update profile (all fields optional)
export const ProfileSchema = z.object({
  first_name: first_name.optional(),
  last_name: last_name.optional(),
  gender,
  birth_date,
  wilaya,
});

// rest the password
export const PasswordResetSchema = z
  .object({
    old_password: z.string().min(8, "Old password is required"),
    password,
    password_confirmation,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

// Login
export const LoginSchema = z.object({
  email,
  password,
});

// ---------------------------
// Token & Auth response schemas
// ---------------------------
export const TokenSchema = z.object({ token: z.string() });

// Generic Auth data schema (login or register)
export const AuthResponseSchema = z.object({
  message: z.string(),
  data: z.union([
    TokenSchema, // login
    z.object({ client: ProfileSchema, token: TokenSchema }), // register
  ]),
});

// Generic API response wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    message: z.string(),
    data: schema.optional(),
  });

export const ApiErrorResponseSchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

// ---------------------------
// Types
// ---------------------------
export type RegisterCredentials = z.infer<typeof RegisterSchema>;
export type ProfileCredentials = z.infer<typeof ProfileSchema>;
export type LoginCredentials = z.infer<typeof LoginSchema>;
export type PasswordResetCredentials = z.infer<typeof PasswordResetSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ApiResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof ApiResponseSchema<T>>
>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
