import { Story } from '@storybook/vue3';

import Logo from '@/assets/Logo.vue';
import Button from '@/elements/button/Button.vue';
import Header from './Header.vue';
import { defineComponent } from 'vue';

export default {
  title: 'Component/Header',
  component: Header,
  argTypes: {
    appName: { control: { type: 'text', default: 'PBOT App' } }
  }
};

const Branding = defineComponent({
  props: ['appName'],
  components: { Logo },
  template: `<div class="flex items-center">
    <Logo class="w-16 mr-3" />
    <h1>{{ appName }}</h1>
  </div>`
});

const UserMenu = defineComponent({
  components: { Button },
  template: `<div class="mx-4 md:mx-0 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
    <Button size="small" primary>Log in</Button>
    <Button size="small">Create account</Button>
  </div>`
});

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Header, Branding },
  setup: () => {
    return { ...args, userMenu: UserMenu };
  },
  template: `<Header :user-menu="userMenu">
      <template v-slot:branding>
        <Branding :app-name="$props.appName" />
      </template>
      <template v-slot:menu>
        <ul class="flex flex-col md:flex-row md:ml-3 list-none">
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-4 py-2 w-full md:rounded-md text-sm font-medium">Home</a>
          </li>
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-4 py-2 w-full md:rounded-md text-sm font-medium">News</a>
          </li>
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-4 py-2 w-full md:rounded-md text-sm font-medium">App</a>
          </li>
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-4 py-2 w-full md:rounded-md text-sm font-medium">Help</a>
          </li>
        </ul>
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
  template: `<Header :menu="Menu">
      <template v-slot:branding>
        <Branding :app-name="$props.appName" />
      </template>
    </Header>`
});

export const NoMenu = NoMenuTemplate.bind({});
NoMenu.args = {
  appName: 'Transportation App'
};
