import { supabase } from '@/utils/supabase';

type insertFilePayload = {
  userId: string;
  file: string;
  bucket: string;
  name: string;
};

export const storageService = {
  insertFile: async ({ userId, file, bucket, name }: insertFilePayload) => {
    const fileExt = file.split('.').pop() || '';
    const filePath = `${userId}/${name}.${fileExt}`;

    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, arrayBuffer, {
        contentType: `image/${fileExt}`,
        metadata: {
          owner: userId,
        },
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },

  deleteFile: async (path: string) => {
    const { error } = await supabase.storage.from('avatars').remove([path]);

    if (error) {
      throw error;
    }
  },
};
