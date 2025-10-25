/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react-native';
import { useForm } from 'react-hook-form';

import { default as Input } from './index';

const meta = {
  title: 'ui/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Input Label',
    isPassword: false,
    placeholder: 'Input placeholder',
    name: 'input',
  },

  render: args => {
    const { control } = useForm<{ input: string }>({
      defaultValues: { input: '' },
    });

    return <Input {...args} control={control as any} />;
  },
};
