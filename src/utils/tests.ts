import { InputType } from 'storybook/internal/csf';

import * as IconAssets from '@/assets/icons/index';
import { TIcon } from '@/components/ui/Icon';

const iconsArray = [...Object.keys(IconAssets), undefined];

const iconsMapping = iconsArray.reduce(
  (acc, iconName) => {
    if (iconName !== undefined) {
      acc[iconName] = { name: iconName as TIcon };
    }
    return acc;
  },
  {} as Record<string, { name: TIcon }>,
);

export const iconsSelect: InputType = {
  control: 'select',
  options: iconsArray,
  mapping: iconsMapping,
};
