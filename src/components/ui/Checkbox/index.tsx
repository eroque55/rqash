import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

import Icon from '../Icon';
import Pressable from '../Pressable';

type Props = {
  isSelected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

const Checkbox = ({ isSelected = false, disabled = false, onPress }: Props) => {
  const { isDark } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      className="aspect-square w-6 items-center justify-center overflow-hidden rounded-md border"
      disabled={disabled}
      style={
        isSelected
          ? {
              backgroundColor: colors.alert.success,
              borderColor: colors.alert.success,
            }
          : {
              backgroundColor: isDark ? colors.neutral[800] : colors.white,
              borderColor: isDark ? colors.neutral[600] : colors.neutral[300],
            }
      }
      onPress={handlePress}
    >
      {isSelected && (
        <Icon
          color={isDark ? colors.neutral[900] : colors.neutral[100]}
          name="CheckIcon"
          size={16}
        />
      )}
    </Pressable>
  );
};

export default Checkbox;
