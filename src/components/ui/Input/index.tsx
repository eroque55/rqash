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
} from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';

import Icon from '../Icon';
import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  isPassword?: boolean;
  placeholder?: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  isBlocked?: boolean;
  minHeight?: number;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  label,
  isPassword,
  placeholder,
  type,
  options,
  isBlocked,
  control,
  name,
  autoCapitalize = 'none',
  minHeight,
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
    if (multiline || minHeight) {
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

  const inputStyle: StyleProp<TextStyle> = {
    flexGrow: 1,
    height: '100%',
    minHeight: 44,
    padding: 8,
    fontSize: 18,
    lineHeight: 28,
    color: isDark ? colors.neutral[400] : colors.neutral[500],
    paddingRight: isPassword || isBlocked ? 44 : undefined,
  };

  return (
    <Animated.View className="w-full gap-1" layout={LinearTransition}>
      {label && (
        <Text className="text-base text-neutral-600 dark:text-neutral-200">
          {label}
        </Text>
      )}

      <View>
        <View
          className="w-full flex-row items-center rounded-lg border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-800"
          style={{ minHeight }}
        >
          {type ? (
            <TextInputMask
              ref={field.ref}
              autoCapitalize={autoCapitalize}
              editable={!isBlocked}
              maxLength={length()}
              multiline={!!minHeight || multiline}
              options={options}
              placeholder={placeholder}
              placeholderTextColor={
                isDark ? colors.neutral[600] : colors.neutral[400]
              }
              refInput={field.ref}
              secureTextEntry={passwordHidden}
              style={inputStyle}
              textAlignVertical="top"
              type={type}
              value={field.value}
              onChangeText={field.onChange}
              {...props}
            />
          ) : (
            <TextInput
              ref={field.ref}
              autoCapitalize={autoCapitalize}
              editable={!isBlocked}
              maxLength={length()}
              multiline={!!minHeight || multiline}
              placeholder={placeholder}
              placeholderTextColor={
                isDark ? colors.neutral[600] : colors.neutral[400]
              }
              secureTextEntry={passwordHidden}
              style={inputStyle}
              textAlignVertical="top"
              value={field.value}
              onChangeText={field.onChange}
              {...props}
            />
          )}

          {isBlocked && (
            <View className="absolute right-3 h-6 w-6 items-center justify-center self-center">
              <Icon color={colors.neutral[500]} name="PadlockIcon" />
            </View>
          )}

          {isPassword && (
            <Pressable
              className="absolute right-2 items-center justify-center overflow-hidden rounded-full p-1"
              onPress={() => {
                setPasswordHidden(!passwordHidden);
              }}
            >
              <Icon
                key={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
                color={
                  passwordHidden ? colors.neutral[500] : colors.primary[500]
                }
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
