import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

import { mockExpenseCategories } from '@/assets/mock/expenseCategories';

import ExpenseCategoriesListItem from './ExpenseCategoriesListItem';

const ExpenseCategoriesList = () => {
  return (
    <FlashList
      data={mockExpenseCategories}
      ItemSeparatorComponent={() => <View className="h-3" />}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ExpenseCategoriesListItem expenseCategory={item} />
      )}
      scrollEnabled={false}
    />
  );
};

export default ExpenseCategoriesList;
