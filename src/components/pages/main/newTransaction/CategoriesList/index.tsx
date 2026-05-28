import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FlatList, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useListCategories } from '@/hooks/api/useCategoryApi';

import CategoriesListItem from './CategoriesListItem';

const CategoriesList = <TFieldValues extends FieldValues>({
  control,
  name,
}: UseControllerProps<TFieldValues>) => {
  const { data } = useListCategories();

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
        columnWrapperClassName="justify-center gap-3"
        contentContainerClassName="gap-3"
        data={data}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <CategoriesListItem
            category={item}
            isSelected={field.value === item.id}
            onPress={() => field.onChange(item.id)}
          />
        )}
        scrollEnabled={false}
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
