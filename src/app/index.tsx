import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { LogoImg } from '@/assets/images';
import { Image } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { useDimensions } from '@/hooks/common';

const Root = () => {
  const router = useRouter();
  const { insets } = useDimensions();
  const { user } = useAuth();

  const handleRedirect = () => {
    setTimeout(() => {
      if (user) {
        router.replace('/(main)/home');
        return;
      }
      router.replace('/(auth)/login');
    }, 1000);
  };

  return (
    <View
      className="flex-1 bg-primary-500"
      style={{ marginTop: -insets.top, paddingTop: insets.top }}
    >
      <Animated.View
        className="flex-1 items-center justify-center p-16"
        entering={FadeIn.delay(1000)
          .duration(1000)
          .withCallback(finished => {
            if (finished) {
              scheduleOnRN(handleRedirect);
            }
          })}
      >
        <Image
          className="h-full w-full"
          contentFit="contain"
          source={LogoImg}
        />
      </Animated.View>
    </View>
  );
};

export default Root;
