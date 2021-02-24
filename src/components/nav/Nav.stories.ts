import { Story } from '@storybook/vue3';

import Nav from './Nav.vue';
import NavItem from './NavItem.vue';

export default {
  title: 'Component/Nav',
  component: Nav,
  argTypes: {
    navClasses: {
      control: { type: 'text' },
      description: 'Classes applied to the nav list'
    },
    navItemClasses: {
      control: {
        type: 'text'
      },
      description: 'Classes applied to each NavItem'
    }
  }
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Nav, NavItem },
  setup: () => {
    return { ...args };
  },
  template: `<Nav :class="navClasses">
    <NavItem url="#" :class="navItemClasses">Home</NavItem>
    <NavItem url="#" :class="navItemClasses">News</NavItem>
    <NavItem url="#" :class="navItemClasses">Events</NavItem>
    <NavItem url="#" :class="navItemClasses">Apps</NavItem>
  </Nav>`
});

export const Basic = Template.bind({});

export const Header = Template.bind({});
Header.args = {
  navClasses: 'flex flex-col md:flex-row',
  navItemClasses: 'hover:bg-gray-100'
};
