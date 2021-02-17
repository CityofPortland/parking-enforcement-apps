import MyHeader from '@/components/Header.vue';

export default {
  title: 'Component/Header',
  component: MyHeader,
  argTypes: {
    appName: { control: { type: 'text', default: 'PBOT App' } }
  }
};

const Template = (_args: unknown, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { MyHeader },
  template: `<my-header>
      <template v-slot:branding>
        <h1>{{ $props.appName }}</h1>
      </template>
      <template v-slot:menu>
        <ul class="flex flex-col md:flex-row md:ml-10 list-none">
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-3 py-2 w-full md:rounded-md text-sm font-medium">Home</a>
          </li>
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-3 py-2 w-full md:rounded-md text-sm font-medium">News</a>
          </li>
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-3 py-2 w-full md:rounded-md text-sm font-medium">App</a>
          </li>
          <li>
            <a href="#" class="flex hover:bg-gray-600 text-white px-3 py-2 w-full md:rounded-md text-sm font-medium">Help</a>
          </li>
        </ul>
      </template>
    </my-header>`
});

export const Basic = Template.bind({});
Basic.args = {
  appName: 'Transportation App'
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  appName: 'Transportation App With a Name That is Too Long'
};
