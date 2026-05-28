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
import { fontFamily } from '@/global/fontFamily';
import { useTheme } from '@/hooks/common/useTheme';

type Props<TFieldValues extends FieldValues> = {
  label: string;
  placeholder: string;
  isValue?: boolean;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
} & UseControllerProps<TFieldValues> &
  TextInputProps;

const NewTransactionInput = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  isValue = false,
  name,
  control,
  autoCapitalize = 'none',
  multiline = false,
  type,
  options,
  ...props
}: Props<TFieldValues>) => {
  const { isDark } = useTheme();

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const inputStyle: StyleProp<TextStyle> = {
    flexGrow: 1,
    fontSize: isValue ? 28 : 16,
    lineHeight: isValue ? 34 : 24,
    color: isDark ? colors.neutral[100] : colors.neutral[800],
    fontFamily: isValue ? fontFamily.inter_extraBold[0] : fontFamily.inter[0],
  };

  const commonProps: TextInputProps = {
    autoCapitalize,
    multiline,
    placeholder,
    placeholderTextColor: isDark ? colors.neutral[600] : colors.neutral[400],
    style: inputStyle,
    value: field.value,
    onChangeText: field.onChange,
    ...props,
  };

  return (
    <Animated.View
      className="w-full gap-3 rounded-[20px] bg-white p-5 dark:bg-neutral-800"
      layout={LinearTransition}
    >
      <Text className="font-inter_medium text- text-neutral-600 dark:text-neutral-300">
        {label}
      </Text>

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

      {error?.message && (
        <Animated.Text
          className="text-alert-error text-xs"
          entering={FadeIn}
          exiting={FadeOut}
        >
          {error.message}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default NewTransactionInput;
