import { Story, Meta } from '@storybook/vue3';

import Button from './Button.vue';
import { ButtonProps } from '@/elements/button/Button.types';

export default {
  title: 'Element/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] }
    },
    color: {
      control: { type: 'select', options: ['gray', 'blue', 'green', 'red'] }
    },
    onClick: { action: 'clicked' }
  }
} as Meta;

const Template: Story<ButtonProps> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  setup() {
    return { ...args };
  },
  template:
    '<Button @click="onClick" :color="color" :size="size" :label="label" />'
});

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button'
};
