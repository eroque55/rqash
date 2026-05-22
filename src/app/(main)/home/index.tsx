import { Text, View } from 'react-native';

import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <View className="flex-1 items-center justify-center gap-20 p-4">
      <View className="w-full">
        <Text className="text-base text-neutral-600">Bem Vindo</Text>

        <Text className="text-lg text-neutral-100">{user?.name}</Text>
      </View>

      <Button text="Sair" />
    </View>
  );
};

export default Home;
