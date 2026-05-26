import { FlatList, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { mockExpensesByCategory } from '@/assets/mock/expensesByCategory';

import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import ExpensesByCategoryIndicator from './ExpensesByCategoryIndicator';

const ExpensesByCategory = () => {
  return (
    <Animated.View
      className="w-full gap-5 rounded-[20px] bg-white p-5 dark:bg-neutral-800"
      entering={FadeIn}
    >
      <Text className="font-inter_semiBold text-sm text-neutral-800 dark:text-neutral-200">
        Gastos por categoria
      </Text>

      <View className="flex-row items-center gap-5">
        <ExpensesByCategoryChart data={mockExpensesByCategory} />

        <FlatList
          contentContainerClassName="gap-2"
          data={mockExpensesByCategory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ExpensesByCategoryIndicator
              color={item.color}
              label={item.label}
              value={item.value}
            />
          )}
          scrollEnabled={false}
        />
      </View>
    </Animated.View>
  );
};

export default ExpensesByCategory;
