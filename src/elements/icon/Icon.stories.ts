import { Meta, Story } from '@storybook/vue3';

import Component from './Icon.vue';
import icons from './icons';

export default {
  title: 'Element/Icon',
  component: Component,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.keys(icons)
      }
    }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  template: `<Component v-bind="$props" class="h-12 w-12" />`
});

export const Icon = Template.bind({});
Icon.args = {
  type: 'check-circle'
};
