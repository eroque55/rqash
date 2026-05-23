import { Text, View } from 'react-native';

import { Icon, Pressable } from '@/components/ui';
import { TIcon } from '@/components/ui/Icon';
import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

type Props = {
  icon: TIcon;
  title: string;
  description: string;
  onPress?: () => void;
  isLogOut?: boolean;
};

const ProfileItem = ({
  icon,
  title,
  description,
  onPress,
  isLogOut = false,
}: Props) => {
  const { isDark } = useTheme();

  const getIconColor = () => {
    if (isLogOut) {
      return colors.alert.error;
    }

    if (isDark) {
      return colors.neutral[400];
    }

    return colors.neutral[500];
  };

  const getTitleColor = () => {
    if (isLogOut) {
      return colors.alert.error;
    }

    if (isDark) {
      return colors.neutral[200];
    }

    return colors.neutral[800];
  };

  return (
    <Pressable className="flex-row items-center gap-4 p-5" onPress={onPress}>
      <Icon color={getIconColor()} name={icon} />

      <View className="flex-1 gap-1">
        <Text
          className="font-inter_medium text-sm"
          style={{ color: getTitleColor() }}
        >
          {title}
        </Text>

        <Text className="font-inter text-xs text-neutral-500 dark:text-neutral-400">
          {description}
        </Text>
      </View>

      <Icon
        color={isDark ? colors.neutral[400] : colors.neutral[500]}
        name="ChevronIcon"
        rotate={-90}
        size={16}
      />
    </Pressable>
  );
};

export default ProfileItem;
