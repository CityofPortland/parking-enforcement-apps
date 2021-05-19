import { Story, Meta } from '@storybook/vue3';

import Button from './Button.vue';
import { ButtonProps } from '@/elements/button/Button.types';
import { ColorArgs } from '@/elements/box/Box.stories';

export default {
  title: 'Element/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    onClick: { action: 'clicked' },
    ...ColorArgs,
  },
} as Meta;

const Template: Story<ButtonProps> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  setup() {
    return { ...args };
  },
  template:
    '<Button @click="onClick" :color="color" :variant="variant" :size="size" :label="label" />',
});

const defaultArgs = {
  color: 'blue',
  variant: 'neutral',
  label: 'Button',
};

export const Medium = Template.bind({});
Medium.args = {
  ...defaultArgs,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  ...defaultArgs,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  ...defaultArgs,
};
