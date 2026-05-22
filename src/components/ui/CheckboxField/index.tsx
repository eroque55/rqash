import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Text } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

import Checkbox from '../Checkbox';
import { AnimatedPressable } from '../Pressable';

type Props<TFieldValues extends FieldValues> = {
  label: string;
} & UseControllerProps<TFieldValues>;

const CheckboxField = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
}: Props<TFieldValues>) => {
  const { field } = useController({ name, control });

  const toggleCheckbox = () => {
    field.onChange(!field.value);
  };

  return (
    <AnimatedPressable
      className="-mx-2 -my-1 flex-row items-center gap-2 overflow-hidden rounded-full px-2 py-1"
      layout={LinearTransition}
      onPress={toggleCheckbox}
    >
      <Checkbox disabled isSelected={field.value} />

      <Text className="font-inter text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </Text>
    </AnimatedPressable>
  );
};

export default CheckboxField;
