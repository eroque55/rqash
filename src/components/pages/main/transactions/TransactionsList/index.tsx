import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { EmptyComponent } from '@/components/ui';
import Divider from '@/components/ui/Divider';
import { colors } from '@/global/colors';
import { useTransactions } from '@/hooks/api/useTransactionApi';
import { useTheme } from '@/hooks/common/useTheme';
import { TTransactionsFilter } from '@/types/transaction';

import Transaction from '../../Transaction';

export const styles = StyleSheet.create({
  list: {
    borderRadius: 20,
    padding: 8,
  },
});

type Props = {
  page: TTransactionsFilter;
};

const TransactionList = ({ page }: Props) => {
  const { isDark } = useTheme();

  const { data } = useTransactions(page);

  if (!data || data.length === 0) {
    return <EmptyComponent />;
  }

  return (
    <Animated.FlatList
      key={page}
      contentContainerStyle={[
        styles.list,
        { backgroundColor: isDark ? colors.neutral[800] : colors.white },
      ]}
      data={data}
      entering={FadeIn}
      exiting={FadeOut}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }) => <Transaction transaction={item} />}
      scrollEnabled={false}
    />
  );
};

export default TransactionList;
