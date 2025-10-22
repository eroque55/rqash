/* eslint-disable no-restricted-imports */
import { PropsWithChildren } from 'react';
import {
  GestureResponderEvent,
  PressableProps,
  Pressable as RNPressable,
  View,
} from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import Animated from 'react-native-reanimated';

const Pressable = ({
  children,
  onPress,
  ...props
}: PropsWithChildren<PressableProps>) => {
  const handlePress = (event: GestureResponderEvent) => {
    KeyboardController.dismiss();

    if (onPress) {
      onPress(event);
    }
  };

  return (
    <RNPressable onPress={handlePress} {...props}>
      {({ pressed }) => (
        <>
          {children}

          {pressed && (
            <View className="absolute inset-0 bg-black/10 dark:bg-white/10" />
          )}
        </>
      )}
    </RNPressable>
  );
};

export default Pressable;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export { AnimatedPressable };
