import { Story } from '@storybook/vue3';

import ColorPalette from './ColorPalette.vue';

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ColorPalette },
  setup() {
    return { ...args };
  },
  template: `<ColorPalette :color="color" />`,
});

export const Gray = Template.bind({});
Gray.args = {
  color: 'gray',
};

export const Fog = Template.bind({});
Fog.args = {
  color: 'fog',
};

export const Red = Template.bind({});
Red.args = {
  color: 'red',
};

export const Orange = Template.bind({});
Orange.args = {
  color: 'orange',
};

export const Tangerine = Template.bind({});
Tangerine.args = {
  color: 'tangerine',
};

export const Green = Template.bind({});
Green.args = {
  color: 'green',
};

export const Marine = Template.bind({});
Marine.args = {
  color: 'marine',
};

export const Blue = Template.bind({});
Blue.args = {
  color: 'blue',
};

export const Purple = Template.bind({});
Purple.args = {
  color: 'purple',
};
