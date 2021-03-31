import { Meta, Story } from '@storybook/vue3';

import Component from './Input.vue';

export default {
  title: 'Element/Inputs/Input',
  component: Component,
  argTypes: {
    onInput: { action: 'input' }
  }
} as Meta;

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Component },
  setup() {
    return { ...args, onInput: (input: string) => (args.modelValue = input) };
  },
  template: `<Component
      :id="id"
      :name="name"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @update:modelValue="onInput" />`
});

export const Input = Template.bind({});
Input.args = {
  id: 'input',
  name: 'input',
  type: 'text',
  required: false,
  placeholder: 'Fill me...',
  modelValue: undefined
};
