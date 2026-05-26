import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from '@/components/ui';
import { TExpenseCategory } from '@/types/category';
import { formatCurrency } from '@/utils/format';

type Props = {
  expenseCategory: TExpenseCategory;
  index: number;
};

const ExpenseCategoriesListItem = ({ expenseCategory, index }: Props) => {
  return (
    <Animated.View
      className="flex-row items-center gap-6 rounded-[20px] bg-white p-4 dark:bg-neutral-800"
      entering={FadeIn.delay(index * 100)}
    >
      <Icon
        color={expenseCategory.category.color}
        name={expenseCategory.category.icon}
      />

      <View className="grow gap-1">
        <Text className="font-inter text-sm text-neutral-800 dark:text-neutral-200">
          {expenseCategory.category.name}
        </Text>

        <Text className="font-inter text-xs text-neutral-500 dark:text-neutral-400">
          {formatCurrency(expenseCategory.ammount, true)}
        </Text>
      </View>

      <View className="h-1.5 w-20 rounded-full bg-neutral-100 dark:bg-neutral-600">
        <View
          className="bg-alert-error h-full rounded-full"
          style={{ width: `${expenseCategory.percentage}%` }}
        />
      </View>
    </Animated.View>
  );
};

export default ExpenseCategoriesListItem;
