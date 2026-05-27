import { Text, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';

import { Pressable } from '@/components/ui';
import { colors } from '@/global/colors';
import { useDimensions } from '@/hooks/common';
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
  const { safeWidth } = useDimensions();

  const width = (safeWidth - 20 - 12 - 12 - 20) / 3;

  return (
    <Pressable
      className="grow overflow-hidden rounded-[20px] bg-white dark:bg-neutral-800"
      disabled={isSelected}
      style={{ width, maxWidth: width }}
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
        <SvgFromUri
          color={category.colorHex}
          height={24}
          strokeWidth={1.5}
          uri={category.iconUrl}
          width={24}
        />

        <Text className="font-inter text-center text-xs text-neutral-800 dark:text-neutral-200">
          {category.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default CategoriesListItem;
