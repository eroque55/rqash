import z from './zod';

export const EditProfileSchema = z.object({
  name: z.string().min(1),
  email: z.email().toLowerCase(),
  avatar: z.string(),
});

export type EditProfileForm = z.infer<typeof EditProfileSchema>;
