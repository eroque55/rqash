import { Text, View } from 'react-native';

const ExpensesByCategory = () => {
  return (
    <View className="w-full gap-5 rounded-[20px] bg-white p-5 dark:bg-neutral-800">
      <Text className="font-inter_semiBold text-sm text-neutral-800 dark:text-neutral-200">
        Gastos por categoria
      </Text>

      <View>
        <View className="size-[120px] rounded-full bg-neutral-400" />
      </View>
    </View>
  );
};

export default ExpensesByCategory;
