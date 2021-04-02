import { Story } from '@storybook/vue3';

import Box from './Box';

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Box },
  template: `<Box :as="as" :color="color" :variant="variant" :class="classes">This is a box.</Box>`
});

export const Basic = Template.bind({});
Basic.args = {
  as: 'div',
  classes: '',
  color: 'transparent',
  variant: 'neutral'
};
