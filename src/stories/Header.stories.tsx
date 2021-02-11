import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from '../components/header/Header';
import { Logo } from '../components/header/Logo';

export default {
  title: 'Example/Header',
  component: Header,
  argTypes: {
    appName: { control: { type: 'text', default: 'Transportation App' } },
  },
} as Meta;

const Template: Story<{ appName: string }> = (args) => (
  <Header
    {...args}
    branding={[
      <Logo key="logo" className="w-16" />,
      <h1 className="ml-3 text-xl font-bold leading-none">{args.appName}</h1>,
    ]}
    menu={
      <ul className="mx-3">
        <li>
          <a href="#">Location 1</a>
        </li>
      </ul>
    }
  />
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
