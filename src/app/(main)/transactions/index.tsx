import { useState } from 'react';
import { Text, View } from 'react-native';

import TransactionList from '@/components/pages/main/transactions/TransactionsList';
import { DefaultContainer } from '@/components/ui';
import Tab from '@/components/ui/Tab';
import { useProgressiveLoading } from '@/hooks/common/useProgressiveLoading';

export type TTransactionPage = 'all' | 'income' | 'expenses';

const Transactions = () => {
  const [rdTransactionList] = useProgressiveLoading([200]);
  const [page, setPage] = useState<TTransactionPage>('all');

  const handleTabPress = (selectedPage: TTransactionPage) => {
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

      {rdTransactionList && <TransactionList page={page} />}
    </DefaultContainer>
  );
};

export default Transactions;
