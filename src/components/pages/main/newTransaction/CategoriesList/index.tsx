import { FlashList } from '@shopify/flash-list';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { View } from 'react-native';
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
    <>
      <FlashList
        contentContainerClassName="-mx-1.5"
        data={mockCategories}
        ItemSeparatorComponent={() => <View className="h-3" />}
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
    </>
  );
};

export default CategoriesList;
