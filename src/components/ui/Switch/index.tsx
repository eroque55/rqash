import { useEffect } from 'react';
import Animated, {
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/global/colors';

import { AnimatedPressable } from '../Pressable';

type Props = {
  onChange: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

const Switch = ({ isActive = false, onChange, disabled }: Props) => {
  const activeValue = useSharedValue(isActive ? 1 : 0);

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      activeValue.value,
      [0, 1],
      [colors.neutral[200], colors.alert.success],
    );

    return {
      backgroundColor,
    };
  });

  useEffect(() => {
    activeValue.value = withTiming(isActive ? 1 : 0);
  }, [isActive]);

  return (
    <AnimatedPressable
      className="w-12 justify-center overflow-hidden rounded-full p-0.5"
      disabled={disabled}
      style={[
        {
          alignItems: isActive ? 'flex-end' : 'flex-start',
        },
        containerStyle,
      ]}
      onPress={onChange}
    >
      <Animated.View
        className="size-6 rounded-full bg-white"
        layout={LinearTransition}
      />
    </AnimatedPressable>
  );
};

export default Switch;
