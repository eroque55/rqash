import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import EditAvatar from '@/components/pages/main/profile/editProfile/EditAvatar';
import {
  Button,
  DefaultContainer,
  Icon,
  Input,
  Pressable,
} from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { colors } from '@/global/colors';
import { useUpdateProfile } from '@/hooks/api/useProfileApi';
import { useDeleteFile } from '@/hooks/api/useStorageApi';
import { usePreventBack } from '@/hooks/common';
import { useTheme } from '@/hooks/common/useTheme';
import { useDefaultModal } from '@/store/defaultModalStore';
import {
  EditProfileForm,
  EditProfileSchema,
} from '@/validation/editProfile.validation';

const EditProfile = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const { handleBack } = usePreventBack();
  const { user } = useAuth();
  const { openModal } = useDefaultModal();

  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: deleteAvatar } = useDeleteFile();

  const { control, handleSubmit, reset } = useForm<EditProfileForm>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl || '',
      });
    }
  }, [user]);

  const onSubmit = async (form: EditProfileForm) => {
    try {
      if (user?.avatarUrl) {
        await deleteAvatar(user.avatarUrl.split('/avatars/')[1]);
      }

      await updateProfile({ form, userId: user!.id });
      openModal({
        title: 'Sucesso',
        message: 'Perfil atualizado com sucesso!',
        confirmText: 'OK',
        onConfirm: () => router.back(),
      });
    } catch {
      //handled by default
    }
  };

  return (
    <DefaultContainer contentContainerClassName="px-5 py-10 gap-10 grow">
      <View className="flex-row items-center gap-3">
        <Pressable
          className="-m-2 overflow-hidden rounded-full p-2"
          onPress={handleBack}
        >
          <Icon
            color={isDark ? colors.neutral[400] : colors.neutral[600]}
            name="ChevronIcon"
            rotate={90}
            size={18}
          />
        </Pressable>

        <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
          Editar perfil
        </Text>
      </View>

      <View className="gap-5">
        <EditAvatar control={control} />

        <Input
          autoCapitalize="words"
          control={control}
          label="Nome completo"
          name="name"
          placeholder="Insira seu nome"
        />

        <Input
          control={control}
          keyboardType="email-address"
          label="E-mail"
          name="email"
          placeholder="Insira seu e-mail"
        />
      </View>

      <Button
        style={{ marginTop: 'auto' }}
        text="Salvar alterações"
        onPress={handleSubmit(onSubmit)}
      />
    </DefaultContainer>
  );
};

export default EditProfile;
