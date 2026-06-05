import z, { password } from './zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: password,
    confirmNewPassword: z.string().min(1),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
