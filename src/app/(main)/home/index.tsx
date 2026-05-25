import { Text, View } from 'react-native';

import ExpensesByCategory from '@/components/pages/main/home/ExpensesByCategory';
import HomeSummary from '@/components/pages/main/home/HomeSummary';
import LastTransactions from '@/components/pages/main/home/LastTransactions';
import { DefaultContainer } from '@/components/ui';

const Home = () => {
  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-8">
      <View className="gap-1">
        <Text className="font-inter text-base text-neutral-500 dark:text-neutral-400">
          Olá
        </Text>

        <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
          Bem-vindo ao RQash
        </Text>
      </View>

      <HomeSummary />

      <ExpensesByCategory />

      <LastTransactions />
    </DefaultContainer>
  );
};

export default Home;
