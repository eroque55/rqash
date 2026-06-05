import { supabase } from '@/utils/supabase';
import { ChangePasswordForm } from '@/validation/changePassword.validation';
import { EditProfileForm } from '@/validation/editProfile.validation';

import { storageService } from './storage';

type EditProfilePayload = {
  userId: string;
  form: EditProfileForm;
};

export const profileService = {
  updateProfile: async ({ userId, form }: EditProfilePayload) => {
    if (!form.avatar) {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: form.name,
          email: form.email,
          avatar_url: null,
        })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      return;
    }

    const avatar_url = await storageService.insertFile({
      userId,
      file: form.avatar,
      bucket: 'avatars',
      name: 'avatar',
    });

    const { error } = await supabase
      .from('profiles')
      .update({
        name: form.name,
        email: form.email,
        avatar_url,
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }
  },

  changePassword: async ({
    currentPassword,
    newPassword,
  }: ChangePasswordForm) => {
    const { error } = await supabase.auth.updateUser({
      nonce: currentPassword,
      password: newPassword,
    });

    if (error) {
      throw error;
    }
  },
};
