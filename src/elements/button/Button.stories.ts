import { Story } from '@storybook/vue3';

import Button from './Button.vue';
import { ButtonProps } from '@/elements/button/Button.types';

export default {
  title: 'Element/Button',
  component: Button,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
};

const Template: Story<ButtonProps> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  setup() {
    return { ...args };
  },
  template:
    '<Button @onClick="onClick" :primary="primary" :size="size" :label="label" />'
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
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
