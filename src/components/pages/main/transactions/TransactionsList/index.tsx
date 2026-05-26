import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { TTransactionPage } from '@/app/(main)/transactions';
import { mockTransactions } from '@/assets/mock/transactions';
import Divider from '@/components/ui/Divider';
import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

import Transaction from '../../Transaction';

export const styles = StyleSheet.create({
  list: {
    borderRadius: 20,
    padding: 8,
  },
});

type Props = {
  page: TTransactionPage;
};

const TransactionList = ({ page }: Props) => {
  const { isDark } = useTheme();

  const getData = () => {
    if (page === 'income') {
      return mockTransactions.filter(transaction => transaction.amount > 0);
    }

    if (page === 'expenses') {
      return mockTransactions.filter(transaction => transaction.amount < 0);
    }

    return mockTransactions;
  };

  return (
    <Animated.FlatList
      key={page}
      data={getData()}
      entering={FadeIn}
      exiting={FadeOut}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => <Transaction transaction={item} />}
      scrollEnabled={false}
      style={[
        styles.list,
        { backgroundColor: isDark ? colors.neutral[800] : colors.white },
      ]}
    />
  );
};

export default TransactionList;
