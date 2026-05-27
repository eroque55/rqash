import { format } from 'date-fns';
import { Text, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';

import { colors } from '@/global/colors';
import { TTransaction } from '@/types/transaction';
import { formatCurrency } from '@/utils/format';

type Props = {
  transaction: TTransaction;
};

const Transaction = ({ transaction }: Props) => {
  const isIncome = transaction.type === 'income';

  return (
    <View className="flex-row items-center gap-6 p-3">
      <SvgFromUri
        color={transaction.category.colorHex}
        height={20}
        strokeWidth={1.5}
        uri={transaction.category.iconUrl}
        width={20}
      />

      <View className="grow gap-1">
        <Text
          className="font-inter text-sm text-neutral-800 dark:text-neutral-200"
          numberOfLines={1}
        >
          {transaction.description}
        </Text>

        <Text className="font-inter text-xs text-neutral-500 dark:text-neutral-400">
          {`${transaction.category.name} • ${format(transaction.date, 'P')}`}
        </Text>
      </View>

      <Text
        className="font-inter_semiBold grow text-right text-sm"
        style={{
          color: isIncome ? colors.alert.success : colors.alert.error,
        }}
      >
        {`${isIncome ? '+' : '-'} ${formatCurrency(transaction.amount, true)}`}
      </Text>
    </View>
  );
};

export default Transaction;
