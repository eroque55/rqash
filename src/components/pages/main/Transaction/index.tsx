import { format } from 'date-fns';
import { Text, View } from 'react-native';

import { Icon } from '@/components/ui';
import { colors } from '@/global/colors';
import { TTransaction } from '@/types/transaction';
import { formatCurrency } from '@/utils/format';

type Props = {
  transaction: TTransaction;
};

const Transaction = ({ transaction }: Props) => {
  const isPositive = transaction.amount > 0;

  return (
    <View className="flex-row items-center gap-6 p-3">
      <Icon
        color={transaction.category.color}
        name={transaction.category.icon}
      />

      <View className="grow gap-1">
        <Text
          className="font-inter text-sm text-neutral-800 dark:text-neutral-200"
          numberOfLines={1}
        >
          {transaction.name}
        </Text>

        <Text className="font-inter text-xs text-neutral-500 dark:text-neutral-400">
          {`${transaction.category.name} • ${format(transaction.date, 'P')}`}
        </Text>
      </View>

      <Text
        className="font-inter_semiBold grow text-right text-sm"
        style={{
          color: isPositive ? colors.alert.success : colors.alert.error,
        }}
      >
        {`${isPositive ? '+' : '-'} ${formatCurrency(transaction.amount, true)}`}
      </Text>
    </View>
  );
};

export default Transaction;
