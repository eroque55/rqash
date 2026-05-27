import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

import ProfileItem, {
  ProfileItemProps,
} from '@/components/pages/main/profile/ProfileItem';
import {
  DefaultContainer,
  Icon,
  Image,
  Pressable,
  Switch,
} from '@/components/ui';
import Divider from '@/components/ui/Divider';
import { useAuth } from '@/contexts/useAuth';
import { useTheme } from '@/hooks/common/useTheme';
import { useDefaultModal } from '@/store/defaultModalStore';

const Profile = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const { openModal } = useDefaultModal();

  const handleLogout = () => {
    openModal({
      title: 'Sair',
      message: 'Tem certeza que deseja sair da sua conta?',
      confirmText: 'Sair',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        router.replace('/(auth)/login');
        await logout();
      },
    });
  };

  const options: ProfileItemProps[] = [
    {
      title: 'Perfil',
      description: 'Editar informações pessoais',
      icon: 'UserIcon',
      onPress: () => router.push('/(main)/profile/editProfile'),
    },
    {
      title: 'Segurança',
      description: 'Senha e autenticação',
      icon: 'ShieldIcon',
    },
    {
      title: 'Ajuda',
      description: 'Central de suporte',
      icon: 'QuestionMarkIcon',
    },
    {
      title: 'Sair',
      description: 'Encerrar sessão',
      icon: 'LogOutIcon',
      isLogOut: true,
      onPress: handleLogout,
    },
  ];

  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-5">
      <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
        Perfil
      </Text>

      <View className="flex-row items-center gap-3 rounded-[20px] bg-white p-5 dark:bg-neutral-800">
        {user?.avatarUrl ? (
          <Image className="size-14 rounded-full" source={user.avatarUrl} />
        ) : (
          <View className="bg-primary-500 size-14 items-center justify-center rounded-full">
            <Text className="font-inter_bold text-xl text-white">
              {user?.name.charAt(0)}
            </Text>
          </View>
        )}

        <View className="gap-1">
          <Text className="font-inter_medium text-base text-neutral-800 dark:text-neutral-200">
            {user?.name}
          </Text>

          <Text className="font-inter text-sm text-neutral-500 dark:text-neutral-400">
            {user?.email}
          </Text>
        </View>
      </View>

      <Pressable
        className="flex-row items-center gap-4 overflow-hidden rounded-[20px] bg-white p-5 dark:bg-neutral-800"
        onPress={toggleTheme}
      >
        <Icon name="MoonIcon" />

        <View className="flex-1">
          <Text className="font-inter_medium text-sm text-neutral-800 dark:text-neutral-200">
            Tema escuro
          </Text>

          <Text className="font-inter text-sm text-neutral-500 dark:text-neutral-400">
            Alterar aparência do app
          </Text>
        </View>

        <Switch isActive={isDark} onChange={toggleTheme} />
      </Pressable>

      <FlatList
        className="overflow-hidden rounded-[20px] bg-white dark:bg-neutral-800"
        data={options}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={item => item.title}
        renderItem={({ item }) => <ProfileItem {...item} />}
        scrollEnabled={false}
      />

      <Text className="font-inter self-center text-xs text-neutral-500 dark:text-neutral-400">
        {`v${Constants.expoConfig?.version}`}
      </Text>
    </DefaultContainer>
  );
};

export default Profile;
