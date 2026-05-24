import { Text, View } from 'react-native';

import { formatCurrency } from '@/utils/format';

type Props = {
  color: string;
  label: string;
  value: number;
};

const ExpensesByCategoryIndicator = ({ color, label, value }: Props) => {
  return (
    <View className="flex-row items-center gap-2">
      <View
        className="size-3 rounded-full"
        style={{ backgroundColor: color }}
      />

      <Text className="font-inter_medium grow text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </Text>

      <Text className="font-inter_medium grow text-right text-xs text-neutral-900 dark:text-neutral-200">
        {formatCurrency(value)}
      </Text>
    </View>
  );
};

export default ExpensesByCategoryIndicator;
