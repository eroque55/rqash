import { Text } from 'react-native';

import { useDisableDelay } from '@/hooks/common';

import ButtonActivityIndicator from '../../Button/ButtonActivityIndicator';
import Pressable from '../../Pressable';

type Props = {
  text: string;
  onPress: () => Promise<void> | void;
};

const DefaultModalButton = ({ text, onPress }: Props) => {
  const { executeWithDelay, isLoading } = useDisableDelay();

  const handlePress = async () => {
    await executeWithDelay(onPress);
  };

  return (
    <Pressable
      className="border-neutral-20 w-1/2 items-center justify-center overflow-hidden border-r p-3"
      onPress={handlePress}
    >
      <Text className="text-primary-100 text-base">{text}</Text>

      {isLoading && <ButtonActivityIndicator />}
    </Pressable>
  );
};

export default DefaultModalButton;
