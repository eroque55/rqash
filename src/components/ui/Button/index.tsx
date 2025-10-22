import { PropsWithChildren } from 'react';
import {
  DimensionValue,
  GestureResponderEvent,
  PressableProps,
  Text,
} from 'react-native';
import { AnimatedProps, LinearTransition } from 'react-native-reanimated';

import { colors } from '@/global/colors';
import { useDisableDelay } from '@/hooks/common';
import { useTheme } from '@/hooks/common/useTheme';

import Icon, { IconProps } from '../Icon';
import { AnimatedPressable } from '../Pressable';

import ButtonActivityIndicator from './ButtonActivityIndicator';

type Props = {
  text?: string;
  wired?: boolean;
  color?: string;
  leftIcon?: IconProps;
  isLoading?: boolean;
  width?: DimensionValue;
  withoutDelay?: boolean;
} & PressableProps &
  AnimatedProps<PropsWithChildren<PressableProps>>;

const Button = ({
  text,
  wired = false,
  color = colors.primary[500],
  isLoading = false,
  onPress,
  withoutDelay = false,
  width = '100%',
  leftIcon,
  ...props
}: PropsWithChildren<Props>) => {
  const { isDark } = useTheme();
  const { executeWithDelay, isLoading: loading } = useDisableDelay();

  const handleColor = () => {
    if (wired) {
      return undefined;
    }

    return color;
  };

  const handleTextColor = () => {
    if (wired) {
      return color;
    }

    return isDark ? colors.neutral[900] : colors.neutral[100];
  };

  const handlePress = async (e: GestureResponderEvent) => {
    if (!onPress) {
      return;
    }

    if (withoutDelay) {
      onPress(e);
      return;
    }

    await executeWithDelay(() => onPress(e));
  };

  return (
    <AnimatedPressable
      className="flex-row items-center justify-center gap-3 overflow-hidden rounded-full border-2 p-2"
      layout={LinearTransition}
      style={{
        backgroundColor: handleColor(),
        borderColor: wired ? color : colors.transparent,
        width,
      }}
      onPress={handlePress}
      {...props}
    >
      {leftIcon && (
        <Icon color={leftIcon.color || handleTextColor()} {...leftIcon} />
      )}

      <Text
        className="text-lg"
        style={{
          color: handleTextColor(),
        }}
      >
        {text}
      </Text>

      {(isLoading || loading) && <ButtonActivityIndicator />}
    </AnimatedPressable>
  );
};

export default Button;
