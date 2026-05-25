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

type Props = {
  withoutFeedback?: boolean;
} & PressableProps;

const Pressable = ({
  withoutFeedback = false,
  children,
  onPress,
  ...props
}: PropsWithChildren<Props>) => {
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

          {pressed && !withoutFeedback && (
            <View className="absolute inset-0 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.1)]" />
          )}
        </>
      )}
    </RNPressable>
  );
};

export default Pressable;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export { AnimatedPressable };
