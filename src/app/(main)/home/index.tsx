import { useForm } from 'react-hook-form';
import { FlatList, ScrollView, Text, View } from 'react-native';

import { Icon, Input, Pressable } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { colors } from '@/global/colors';

const Home = () => {
  const { user } = useAuth();

  const { control } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  return (
    <ScrollView
      contentContainerClassName="px-6 py-10 gap-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-1">
        <Text className="font-inter_bold text-3xl text-primary">
          Olá, {user!.name}
        </Text>

        <Text className="font-inter text-xl text-neutral-500 dark:text-neutral-400">
          Bem vindo ao RQash
        </Text>
      </View>

      <View className="w-full flex-row gap-2">
        <Input
          control={control}
          leftIcon={{ name: 'MagnifyingGlassIcon' }}
          name="search"
          placeholder="Pesquisa"
        />

        <Pressable className="aspect-square items-center justify-center overflow-hidden rounded-full bg-primary">
          <Icon color={colors.white} name="SliderIcon" />
        </Pressable>
      </View>

      <FlatList
        contentContainerClassName="gap-3"
        data={[]}
        ListHeaderComponent={
          <Pressable className="items-center overflow-hidden rounded-lg bg-white p-3 dark:bg-neutral-800">
            <Icon color={colors.neutral[500]} name="PlusCircleIcon" />
          </Pressable>
        }
        renderItem={null}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Home;
