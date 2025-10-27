import { ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors } from '@/global/colors';

type Props = {
  isLoading: boolean;
};

const ButtonActivityIndicator = ({ isLoading }: Props) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Animated.View
      className="absolute -inset-1 items-center justify-center bg-black/30"
      entering={FadeIn}
      exiting={FadeOut}
      testID="button-activity-indicator"
    >
      <ActivityIndicator color={colors.white} size={20} />
    </Animated.View>
  );
};

export default ButtonActivityIndicator;
