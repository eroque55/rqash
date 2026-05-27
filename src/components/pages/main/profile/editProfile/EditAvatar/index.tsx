import * as ImagePicker from 'expo-image-picker';
import { Control, useController } from 'react-hook-form';
import { Text } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { Icon, Image, Pressable } from '@/components/ui';
import { colors } from '@/global/colors';
import { useTheme } from '@/hooks/common/useTheme';
import { EditProfileForm } from '@/validation/editProfile.validation';

type Props = {
  control: Control<EditProfileForm>;
};

const EditAvatar = ({ control }: Props) => {
  const { isDark } = useTheme();
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'avatar', control });

  const handlePickImage = async () => {
    if (field.value) {
      field.onChange('');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      field.onChange(uri);
    }
  };

  return (
    <Animated.View className="gap-2" layout={LinearTransition}>
      <Text className="font-inter text-sm text-neutral-600 dark:text-neutral-300">
        Avatar
      </Text>

      {field.value ? (
        <Pressable
          key={field.value}
          className="size-32 self-center overflow-hidden rounded-full"
          onPress={handlePickImage}
        >
          <Image className="grow" source={field.value} />
        </Pressable>
      ) : (
        <Pressable
          className="size-32 items-center justify-center self-center overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
          onPress={handlePickImage}
        >
          <Icon
            color={isDark ? colors.neutral[400] : colors.neutral[600]}
            name="PlusIcon"
          />
        </Pressable>
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

export default EditAvatar;
