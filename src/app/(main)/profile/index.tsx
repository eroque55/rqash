import Constants from 'expo-constants';
import { Text, View } from 'react-native';

import ProfileItem from '@/components/pages/main/profile/ProfileItem';
import { DefaultContainer, Icon, Pressable, Switch } from '@/components/ui';
import Divider from '@/components/ui/Divider';
import { useAuth } from '@/contexts/useAuth';
import { useTheme } from '@/hooks/common/useTheme';

const Profile = () => {
  const { user } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-5">
      <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
        Perfil
      </Text>

      <View className="flex-row items-center gap-3 rounded-[20px] bg-white p-5 dark:bg-neutral-800">
        <View className="bg-primary-500 size-14 items-center justify-center rounded-full">
          <Text className="font-inter_bold text-xl text-white">R</Text>
        </View>

        <View className="gap-1">
          <Text className="font-inter_medium text-base text-neutral-800 dark:text-neutral-200">
            Roque
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

      <View className="overflow-hidden rounded-[20px] bg-white dark:bg-neutral-800">
        <ProfileItem
          description="Senha e autenticação"
          icon="ShieldIcon"
          title="Segurança"
        />

        <Divider />

        <ProfileItem
          description="Central de suporte"
          icon="QuestionMarkIcon"
          title="Ajuda"
        />

        <Divider />

        <ProfileItem
          isLogOut
          description="Encerrar sessão"
          icon="LogOutIcon"
          title="Sair"
        />
      </View>

      <Text className="font-inter self-center text-xs text-neutral-500 dark:text-neutral-400">
        {`v${Constants.expoConfig?.version}`}
      </Text>
    </DefaultContainer>
  );
};

export default Profile;
