import { Story } from '@storybook/vue3';

import Resultspanel from './Resultspanel.vue';

export default {
  title: 'Component/Resultspanel',
  component: Resultspanel
  /*argTypes: {
    navClasses: {
      control: { type: 'text' },
      description: 'Classes applied to the nav list'
    }
  }*/
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Resultspanel },
  setup: () => {
    return { ...args };
  },
  template: `...This is a results panel...`
});

export const Basic = Template.bind({});

/*
export const Header = Template.bind({});
Header.args = {
  navClasses: 'flex flex-col md:flex-row',
  navItemClasses: 'hover:bg-gray-100'
};
*/