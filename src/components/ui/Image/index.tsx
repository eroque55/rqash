/* eslint-disable no-restricted-imports */
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { PropsWithChildren, useState } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

import Shimmer from '../Shimmer';

type Props = {
  showShimmer?: boolean;
  containerProps?: AnimatedProps<ViewProps>;
} & ImageProps;

const Image = ({
  children,
  style,
  showShimmer = false,
  containerProps,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <Animated.View
      className={`overflow-hidden ${className}`}
      style={style}
      {...containerProps}
    >
      <ExpoImage style={{ flex: 1 }} onLoad={onLoad} {...props} />

      {isLoading && showShimmer && (
        <View className="absolute inset-0">
          <Shimmer />
        </View>
      )}

      {children}
    </Animated.View>
  );
};

export default Image;
