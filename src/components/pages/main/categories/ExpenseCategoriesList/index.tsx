import Animated, { FadeIn } from 'react-native-reanimated';

import { useTransactionsGroupedByCategory } from '@/hooks/api/useTransactionApi';

import ExpenseCategoriesListItem from './ExpenseCategoriesListItem';

const ExpenseCategoriesList = () => {
  const { data } = useTransactionsGroupedByCategory();

  return (
    <Animated.FlatList
      contentContainerClassName="gap-3"
      data={data}
      entering={FadeIn}
      keyExtractor={item => item.category.id}
      renderItem={({ item, index }) => (
        <ExpenseCategoriesListItem expenseCategory={item} index={index} />
      )}
      scrollEnabled={false}
    />
  );
};

export default ExpenseCategoriesList;
