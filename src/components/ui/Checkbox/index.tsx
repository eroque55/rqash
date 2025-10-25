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
      className="aspect-square w-6 items-center justify-center overflow-hidden rounded-md"
      disabled={disabled}
      style={
        isSelected
          ? {
              backgroundColor: colors.alert.success,
            }
          : {
              backgroundColor: isDark ? colors.neutral[800] : colors.white,
            }
      }
      onPress={handlePress}
    >
      {isSelected && <Icon color={colors.white} name="CheckIcon" size={16} />}
    </Pressable>
  );
};

export default Checkbox;
