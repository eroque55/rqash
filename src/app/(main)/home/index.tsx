import { ScrollView, Text, View } from 'react-native';

import HomeIndicator from '@/components/pages/main/home/HomeIndicator';
import { TabBar } from '@/components/ui';
import { formatCurrency } from '@/utils/format';

const Home = () => {
  return (
    <>
      <ScrollView
        contentContainerClassName="px-5 py-10 gap-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-1">
          <Text className="font-inter text-base text-neutral-500 dark:text-neutral-400">
            Olá
          </Text>

          <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
            Bem-vindo ao RQash
          </Text>
        </View>

        <View className="w-full gap-5 rounded-[20px] bg-primary-500 p-5">
          <Text className="font-inter_medium text-base text-neutral-300">
            Saldo total
          </Text>

          <Text className="font-inter_extraBold text-3xl text-white">
            {formatCurrency(1234.56)}
          </Text>

          <View className="w-full flex-row gap-5">
            <HomeIndicator title="Receitas" value={1234.56} />

            <HomeIndicator title="Despesas" value={1234.56} />
          </View>
        </View>
      </ScrollView>

      <TabBar />
    </>
  );
};

export default Home;
