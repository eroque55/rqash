import { FlatList, Text, View } from 'react-native';
import { pieDataItem } from 'react-native-gifted-charts';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useTransactionsGroupedByCategory } from '@/hooks/api/useTransactionApi';

import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import ExpensesByCategoryIndicator from './ExpensesByCategoryIndicator';

const ExpensesByCategory = () => {
  const { data } = useTransactionsGroupedByCategory();

  const mappedData: pieDataItem[] =
    data?.map(item => ({
      value: item.ammount,
      color: item.category.colorHex,
      text: item.category.name,
    })) || [];

  const topCategories = mappedData.slice(0, 5);
  const otherCategories = mappedData.slice(5);

  if (otherCategories.length > 0) {
    const otherValue = otherCategories.reduce(
      (acc, item) => acc + item.value,
      0,
    );
    topCategories.push({
      value: otherValue,
      color: '#ccc',
      text: 'Outros',
    });
  }

  return (
    <Animated.View
      className="w-full gap-5 rounded-[20px] bg-white p-5 dark:bg-neutral-800"
      entering={FadeIn}
    >
      <Text className="font-inter_semiBold text-sm text-neutral-800 dark:text-neutral-200">
        Gastos por categoria
      </Text>

      <View className="flex-row items-center gap-5">
        <ExpensesByCategoryChart data={mappedData} />

        <FlatList
          contentContainerClassName="gap-2"
          data={topCategories}
          keyExtractor={item => item.text!}
          renderItem={({ item }) => (
            <ExpensesByCategoryIndicator
              color={item.color!}
              label={item.text!}
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
