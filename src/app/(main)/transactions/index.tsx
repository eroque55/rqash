import { useState } from 'react';
import { Text, View } from 'react-native';

import { DefaultContainer } from '@/components/ui';
import Tab from '@/components/ui/Tab';

type TPage = 'all' | 'income' | 'expenses';

const Transactions = () => {
  const [page, setPage] = useState<TPage>('all');

  const handleTabPress = (selectedPage: TPage) => {
    setPage(selectedPage);
  };

  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-5">
      <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
        Transações
      </Text>

      <View className="flex-row items-center gap-2">
        <Tab
          isActive={page === 'all'}
          text="Todas"
          onPress={() => handleTabPress('all')}
        />

        <Tab
          isActive={page === 'income'}
          text="Receitas"
          onPress={() => handleTabPress('income')}
        />

        <Tab
          isActive={page === 'expenses'}
          text="Despesas"
          onPress={() => handleTabPress('expenses')}
        />
      </View>
    </DefaultContainer>
  );
};

export default Transactions;
