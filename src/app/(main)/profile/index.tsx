import { Text, View } from 'react-native';

import { DefaultContainer, Icon, Switch } from '@/components/ui';
import { useTheme } from '@/hooks/common/useTheme';

const Profile = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-5">
      <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
        Perfil
      </Text>

      <View className="flex-row items-center gap-3 rounded-[20px] bg-white p-5 dark:bg-neutral-800">
        <View className="size-14 items-center justify-center rounded-full bg-primary-500">
          <Text className="font-inter_bold text-xl text-white">R</Text>
        </View>

        <View className="gap-1">
          <Text className="font-inter_medium text-base text-neutral-800 dark:text-neutral-200">
            Roque
          </Text>

          <Text className="font-inter text-sm text-neutral-500 dark:text-neutral-400">
            email@email.com
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-4 rounded-[20px] bg-white p-5 dark:bg-neutral-800">
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
      </View>
    </DefaultContainer>
  );
};

export default Profile;
