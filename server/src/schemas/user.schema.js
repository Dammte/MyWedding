import { z } from "zod";

/**
 * @description
 * Get all the parameters that have the user and validate the format of each one.
 * For more information, search "zod npm" in google.
 */
export const registerSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  lastname: z
    .string({
      invalid_type_error: "Lastname must be a string",
    }) 
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 6 characters",
    }),
});

/**
 * @description
 * This is the schema of the login method. Validate the fields email and password to 
 * join into the application.
 */
export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Email is not valid",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, {
        message: "Password must be at least 6 characters",
    })
});
