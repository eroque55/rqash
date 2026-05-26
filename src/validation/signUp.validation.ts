import z, { password } from './zod';

export const SignUpSchema = z
  .object({
    name: z.string().trim().min(1),
    email: z.email().toLowerCase(),
    password,
    confirmPassword: z.string().trim().min(1),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type SignUpForm = z.infer<typeof SignUpSchema>;
