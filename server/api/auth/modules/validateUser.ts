// import { z } from "zod"

// 1. Define the schema
// export const loginSchema = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// })

// export default defineEventHandler(async (event) => {
//   // 2. You must extract the body from the request first
//   const body = await readBody(event)

//   // 3. Validate the body
//   const result = loginSchema.safeParse(body)

//   // 4. Handle validation failure
//   if (!result.success) {
//     throw createError({
//       statusCode: 400,
//       statusMessage: 'Validation Failed',
//       // flatten() makes the error object much cleaner for the frontend
//       data: result.error.flatten(),
//     })
//   }

//   // 5. If successful, use result.data (which is now fully typed)
//   const { email, password } = result.data

//   return { message: 'Success', email }
// })

import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required") // Replaces required_error
    .email("Please provide a valid email address").min(50),
  password: z
    .string()
    .min(1, "Password is required") // Replaces required_error
    .min(6, "Password must be at least 6 characters long"),
});