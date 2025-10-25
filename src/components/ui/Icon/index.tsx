import { ViewStyle } from 'react-native';

import * as IconAssets from '@/assets/icons/index';
import { colors } from '@/global/colors';

export type TIcon = keyof typeof IconAssets;

export type IconProps = {
  name: TIcon;
  size?: number;
  style?: ViewStyle;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  fill?: string;
};

/**
 * Default:
 * ```
 * size: 20
 * color: colors.primary
 * strokeWidth: 2
 * ```
 */

const Icon = ({
  name,
  size = 20,
  color = colors.primary,
  strokeWidth = 2,
  style,
  rotate = 0,
  fill = 'none',
}: IconProps) => {
  if (name && !!IconAssets?.[name]) {
    return IconAssets[name]({
      width: size,
      height: size,
      color,
      strokeWidth,
      style,
      fill,
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    });
  }
};

export default Icon;
