import { mount } from '@vue/test-utils';
import Anchor from '@/elements/anchor/Anchor.vue';

describe('Anchor.vue', () => {
  const options = {
    props: {
      url: 'https://portland.gov'
    }
  };

  it('outputs url by default', () => {
    const wrapper = mount(Anchor, options);
    expect(wrapper.text()).toBe('https://portland.gov');
  });

  it('outputs external icon by default with external url', async () => {
    const wrapper = mount(Anchor, options);
    expect(wrapper.find('svg')).toBeTruthy();
  });

  it(`doesn't output external icon by default with internal url`, async () => {
    const wrapper = mount(Anchor, {
      props: {
        url: '/other'
      }
    });
    expect(wrapper.find('svg').exists()).toBeFalsy();
  });

  it('outputs external icon when told to', async () => {
    const wrapper = mount(Anchor, {
      ...options,
      props: {
        ...options.props,
        url: '/other',
        external: true
      }
    });
    expect(wrapper.find('svg')).toBeTruthy();
  });

  it('prevents external icon when told to', async () => {
    const wrapper = mount(Anchor, {
      ...options,
      props: {
        ...options.props,
        url: '/other',
        external: false
      }
    });
    expect(wrapper.find('svg')).toBeTruthy();
  });
});
