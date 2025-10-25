import type { Meta, StoryObj } from '@storybook/react-native';
import { fn } from 'storybook/test';

import { colors } from '@/global/colors';
import { iconsSelect } from '@/utils/tests';

import { default as Button } from './index';

const meta = {
  title: 'ui/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    text: 'Button',
    color: colors.primary,
    wired: false,
    isLoading: false,
    onPress: fn(),
    withoutDelay: false,
    leftIcon: undefined,
  },
  argTypes: {
    leftIcon: iconsSelect,
  },
};
