import { Text } from 'react-native';

import { colors } from '@/global/colors';
import { useDisableDelay } from '@/hooks/common';
import { useTheme } from '@/hooks/common/useTheme';

import ButtonActivityIndicator from '../../Button/ButtonActivityIndicator';
import Pressable from '../../Pressable';

type Props = {
  text: string;
  onPress: () => Promise<void> | void;
  showBorder?: boolean;
};

const DefaultModalButton = ({ text, onPress, showBorder = false }: Props) => {
  const { executeWithDelay, isLoading } = useDisableDelay();
  const { isDark } = useTheme();

  const handlePress = async () => {
    await executeWithDelay(onPress);
  };

  const getBorderColor = () => {
    if (!showBorder) {
      return colors.transparent;
    }

    return isDark ? colors.neutral[600] : colors.neutral[200];
  };

  return (
    <Pressable
      className="grow items-center justify-center overflow-hidden border-r p-3"
      style={{ borderColor: getBorderColor() }}
      onPress={handlePress}
    >
      <Text className="text-primary-500 font-inter_semiBold text-sm">
        {text}
      </Text>

      <ButtonActivityIndicator isLoading={isLoading} />
    </Pressable>
  );
};

export default DefaultModalButton;
