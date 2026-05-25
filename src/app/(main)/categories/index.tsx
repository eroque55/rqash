import { Text, View } from 'react-native';

import ExpenseCategoriesList from '@/components/pages/main/categories/ExpenseCategoriesList';
import { DefaultContainer } from '@/components/ui';

const Categories = () => {
  return (
    <DefaultContainer showTabBar contentContainerClassName="px-5 py-10 gap-5">
      <View className="w-full gap-2">
        <Text className="font-inter_semiBold text-xl text-neutral-800 dark:text-neutral-200">
          Categorias
        </Text>

        <Text className="font-inter text-base text-neutral-500 dark:text-neutral-400">
          Gerencie suas categorias de gastos
        </Text>
      </View>

      <ExpenseCategoriesList />
    </DefaultContainer>
  );
};

export default Categories;
