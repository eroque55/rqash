import { FlatList, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import Divider from '@/components/ui/Divider';
import { useTransactions } from '@/hooks/api/useTransactionApi';

import Transaction from '../../Transaction';

const LastTransactions = () => {
  const { data } = useTransactions('all', 3);

  return (
    <Animated.View
      className="w-full gap-5 rounded-[20px] bg-white p-5 dark:bg-neutral-800"
      entering={FadeIn}
    >
      <Text className="font-inter_semiBold text-sm text-neutral-800 dark:text-neutral-200">
        Últimas transações
      </Text>

      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Transaction transaction={item} />}
        scrollEnabled={false}
      />
    </Animated.View>
  );
};

export default LastTransactions;
