import { FlatList, Text, View } from 'react-native';

import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import ExpensesByCategoryIndicator from './ExpensesByCategoryIndicator';

//mock 5

const mockData = [
  {
    id: '1',
    label: 'Comida',
    value: 200,
    color: '#4f46e5',
  },
  {
    id: '2',
    label: 'Transporte',
    value: 120,
    color: '#3b82f6',
  },
  {
    id: '3',
    label: 'Entretenimiento',
    value: 100,
    color: '#f59e0b',
  },
  {
    id: '4',
    label: 'Saúde',
    value: 75,
    color: '#10b981',
  },
  {
    id: '5',
    label: 'Educação',
    value: 50,
    color: '#ef4444',
  },
];

const ExpensesByCategory = () => {
  return (
    <View className="w-full gap-5 rounded-[20px] bg-white p-5 dark:bg-neutral-800">
      <Text className="font-inter_semiBold text-sm text-neutral-800 dark:text-neutral-200">
        Gastos por categoria
      </Text>

      <View className="flex-row items-center gap-5">
        <ExpensesByCategoryChart data={mockData} />

        <FlatList
          contentContainerClassName="gap-2"
          data={mockData}
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
    </View>
  );
};

export default ExpensesByCategory;
