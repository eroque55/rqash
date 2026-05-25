import { Text, View } from 'react-native';

import { Icon, Pressable } from '@/components/ui';
import { colors } from '@/global/colors';
import { TCategory } from '@/types/category';

type Props = {
  category: TCategory;
  onPress: () => void;
  isSelected?: boolean;
};

const CategoriesListItem = ({
  category,
  onPress,
  isSelected = false,
}: Props) => {
  return (
    <Pressable
      className="mx-1.5 grow overflow-hidden rounded-[20px] bg-white dark:bg-neutral-800"
      disabled={isSelected}
      onPress={onPress}
    >
      <View
        className="items-center justify-center gap-3 rounded-[20px] border-2 px-3 py-5"
        style={
          isSelected
            ? {
                backgroundColor: `${colors.primary[500]}1A`,
                borderColor: colors.primary[500],
              }
            : {
                backgroundColor: colors.transparent,
                borderColor: colors.transparent,
              }
        }
      >
        <Icon color={category.color} name={category.icon} />

        <Text className="font-inter text-center text-xs text-neutral-800 dark:text-neutral-200">
          {category.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default CategoriesListItem;
