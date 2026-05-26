import Animated, { FadeIn } from 'react-native-reanimated';

import { mockExpenseCategories } from '@/assets/mock/expenseCategories';

import ExpenseCategoriesListItem from './ExpenseCategoriesListItem';

const ExpenseCategoriesList = () => {
  return (
    <Animated.FlatList
      contentContainerClassName="gap-3"
      data={mockExpenseCategories}
      entering={FadeIn}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <ExpenseCategoriesListItem expenseCategory={item} index={index} />
      )}
      scrollEnabled={false}
    />
  );
};

export default ExpenseCategoriesList;
