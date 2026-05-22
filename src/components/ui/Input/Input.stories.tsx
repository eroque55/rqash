/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react-native';
import { useForm } from 'react-hook-form';

import { iconsSelect } from '@/utils/tests';

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
export const WithMask: Story = {
  args: {
    label: 'Input Label',
    isPassword: false,
    placeholder: 'Input placeholder',
    name: 'input',
    type: 'cel-phone',
    leftIcon: undefined,
    rightIcon: undefined,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: [
        'cel-phone',
        'cnpj',
        'cpf',
        'credit-card',
        'datetime',
        'money',
        'only-numbers',
        'zip-code',
      ],
    },
    leftIcon: iconsSelect,
    rightIcon: iconsSelect,
  },
  render: args => {
    const { control } = useForm<{ input: string }>({
      defaultValues: { input: '' },
    });

    return <Input {...args} control={control as any} />;
  },
};
