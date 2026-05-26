import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FlatList, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { mockCategories } from '@/assets/mock/transactions';

import CategoriesListItem from './CategoriesListItem';

const CategoriesList = <TFieldValues extends FieldValues>({
  control,
  name,
}: UseControllerProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <View className="gap-2">
      <FlatList
        columnWrapperClassName="justify-between"
        contentContainerClassName="gap-3"
        data={mockCategories}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <CategoriesListItem
            category={item}
            isSelected={field.value === item.id}
            onPress={() => field.onChange(item.id)}
          />
        )}
      />

      {error?.message && (
        <Animated.Text
          className="text-alert-error text-xs"
          entering={FadeIn}
          exiting={FadeOut}
        >
          {error.message}
        </Animated.Text>
      )}
    </View>
  );
};

export default CategoriesList;
