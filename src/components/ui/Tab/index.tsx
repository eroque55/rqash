import { Text } from 'react-native';

import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

import Pressable from '../Pressable';

type Props = {
  text: string;
  onPress: () => void;
  isActive?: boolean;
};

const Tab = ({ isActive = false, onPress, text }: Props) => {
  const { isDark } = useTheme();

  const getTextColor = () => {
    if (isActive) {
      return colors.white;
    }

    if (isDark) {
      return colors.neutral[400];
    }

    return colors.neutral[500];
  };

  return (
    <Pressable
      className="overflow-hidden rounded-full px-4 py-3"
      style={{
        backgroundColor: isActive ? colors.primary[500] : colors.transparent,
      }}
      onPress={onPress}
    >
      <Text
        className="font-inter_semiBold text-sm"
        style={{ color: getTextColor() }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Tab;
