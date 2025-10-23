import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Text } from 'react-native';

import Checkbox from '../Checkbox';
import Pressable from '../Pressable';

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
    <Pressable
      className="-mx-2 -my-1 flex-row items-center gap-2 overflow-hidden rounded-full px-2 py-1"
      onPress={toggleCheckbox}
    >
      <Checkbox disabled isSelected={field.value} />

      <Text className="font-inter text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </Text>
    </Pressable>
  );
};

export default CheckboxField;
