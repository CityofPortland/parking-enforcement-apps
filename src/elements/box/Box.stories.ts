import { Story } from '@storybook/vue3';

import Box from './Box';

export default {
  title: 'Element/Box',
  component: Box,
  argTypes: {
    as: {
      description: 'Controls what HTML element this box is rendered as.',
      control: 'text',
      default: 'div'
    },
    color: {
      description:
        'The color themes available for basic elements. All options are verified WCAG AA accessible at minimum.',
      control: {
        type: 'select',
        options: [
          'blue',
          'cyan',
          'gray',
          'green',
          'orange',
          'red',
          'transparent'
        ]
      }
    },
    variant: {
      description:
        'Three different color them variants for the chosen color theme. All variants are WCAG AA accessible at minimum.',
      control: {
        type: 'select',
        options: ['light', 'neutral', 'dark']
      }
    },
    classes: {
      description: 'Adds classes to the Box as you would from Vue.',
      control: {
        type: 'text',
        default: ''
      }
    }
  }
};

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
