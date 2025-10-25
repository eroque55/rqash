import { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import Animated, {
  AnimatedProps,
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

import Icon, { IconProps } from '../Icon';
import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  isPassword?: boolean;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  containerProps?: AnimatedProps<ViewProps>;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  label,
  isPassword,
  leftIcon,
  rightIcon,
  type,
  options,
  containerProps,
  control,
  name,
  autoCapitalize = 'none',
  multiline,
  maxLength,
  ...props
}: Props<TFieldValues>) => {
  const { isDark } = useTheme();
  const [passwordHidden, setPasswordHidden] = useState(isPassword);

  const length = () => {
    if (maxLength) {
      return maxLength;
    }
    if (multiline) {
      return 250;
    }
    return 100;
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handlePaddingRight = () => {
    if (isPassword) {
      return 48;
    }

    if (rightIcon) {
      return 38;
    }
  };

  const inputStyle: StyleProp<TextStyle> = {
    flexGrow: 1,
    padding: 12,
    fontSize: 18,
    lineHeight: 28,
    color: isDark ? colors.neutral[400] : colors.neutral[500],
    paddingRight: handlePaddingRight(),
    paddingLeft: leftIcon ? 38 : undefined,
    fontFamily: 'Inter_400Regular',
  };

  const commonProps: TextInputProps = {
    autoCapitalize,
    maxLength: length(),
    multiline,
    placeholderTextColor: isDark ? colors.neutral[600] : colors.neutral[400],
    secureTextEntry: passwordHidden,
    style: inputStyle,
    textAlignVertical: 'top',
    value: field.value,
    onChangeText: field.onChange,
    ...props,
  };

  return (
    <Animated.View
      className="h-auto flex-grow gap-1"
      layout={LinearTransition}
      {...containerProps}
    >
      {label && (
        <Text className="font-inter text-base text-neutral-600 dark:text-neutral-300">
          {label}
        </Text>
      )}

      <View className="w-full gap-1">
        <View className="w-full flex-row items-center rounded-full bg-white dark:bg-neutral-800">
          {type ? (
            <TextInputMask
              ref={field.ref}
              options={options}
              refInput={field.ref}
              type={type}
              {...commonProps}
            />
          ) : (
            <TextInput ref={field.ref} {...commonProps} />
          )}

          {leftIcon && (
            <Icon
              key={leftIcon.name}
              style={{ position: 'absolute', left: 12, alignSelf: 'center' }}
              {...leftIcon}
            />
          )}

          {rightIcon && (
            <Icon
              key={rightIcon.name}
              style={{ position: 'absolute', right: 12, alignSelf: 'center' }}
              {...rightIcon}
            />
          )}

          {isPassword && (
            <Pressable
              className="absolute right-3 items-center justify-center overflow-hidden rounded-full p-1"
              onPress={() => {
                setPasswordHidden(!passwordHidden);
              }}
            >
              <Icon
                key={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
                color={passwordHidden ? colors.neutral[400] : colors.primary}
                name={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
                size={25}
              />
            </Pressable>
          )}
        </View>

        {error?.message && (
          <Animated.Text
            className="text-xs text-alert-error"
            entering={FadeIn}
            exiting={FadeOut}
          >
            {error.message}
          </Animated.Text>
        )}
      </View>
    </Animated.View>
  );
};

export default Input;
