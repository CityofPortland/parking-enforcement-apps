import { Story } from '@storybook/vue3';
import { defineComponent } from 'vue';

import Logo from '@/assets/Logo.vue';
import Button from '@/elements/button/Button.vue';
import Header from './Header.vue';
import Nav from '../nav/Nav.vue';
import NavItem from '../nav/NavItem.vue';

export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    appName: { control: { type: 'text', default: 'PBOT App' } },
    color: {
      control: { type: 'select', options: ['white', 'gray', 'cyan', 'orange'] }
    },
    onToggle: { action: 'toggled' }
  }
};

const Branding = defineComponent({
  props: ['appName'],
  components: { Logo },
  template: `<div class="flex items-center truncate">
    <Logo class="w-16 mr-3" />
    <h1 class="truncate">{{ appName }}</h1>
  </div>`
});

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header, Logo, Button, Nav, NavItem },
  setup: () => {
    const menuHoverMap = new Map([
      ['white', ['hover:bg-gray-100']],
      ['gray', ['hover:bg-gray-700']],
      ['cyan', ['hover:bg-cyan-300']],
      ['orange', ['hover:bg-orange-300']]
    ]);

    return { menuHover: menuHoverMap.get(args.color), ...args };
  },
  template: `<Header :color="color" :open="open" @toggle="onToggle">
      <template v-slot:branding>
        <Logo class="w-16 mr-3 hidden md:inline-flex" />
        <h1 class="truncate">{{ $props.appName }}</h1>
      </template>
      <template v-slot:menu>
        <Nav class="flex flex-col md:flex-row">
          <NavItem url="#" :class="menuHover">Home</NavItem>
          <NavItem url="#" :class="menuHover">News</NavItem>
          <NavItem url="#" :class="menuHover">Events</NavItem>
        </Nav>
        <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 px-4 py-2 md:p-0 md:ml-auto">
          <Button label="Log in" size="small" primary>Log in</Button>
        </div>
      </template>
    </Header>`
});

export const Basic = Template.bind({});
Basic.args = {
  appName: 'Transportation App'
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  appName: 'Transportation App With a Name That is Too Long'
};

const NoMenuTemplate: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header, Branding },
  setup: () => {
    return { args };
  },
  template: `<Header :color="color">
      <template v-slot:branding>
        <Branding :app-name="$props.appName" />
      </template>
    </Header>`
});

export const NoMenu = NoMenuTemplate.bind({});
NoMenu.args = {
  appName: 'Transportation App'
};
