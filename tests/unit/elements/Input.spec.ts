import { mount } from '@vue/test-utils';
import Input from '@/elements/inputs/Input.vue';
import { TextInputProps } from '@/elements/inputs/inputs';

describe('Input.vue', () => {
  let options = {
    props: {
      id: 'input',
      name: 'input',
    } as TextInputProps,
  };

  it('outputs id and name attributes', () => {
    const wrapper = mount(Input, options);
    const attr = wrapper.attributes();
    expect(attr.id).toBe('input');
    expect(attr.name).toBe('input');
  });

  it('renders modelValue', () => {
    const wrapper = mount(Input, {
      ...options,
      props: {
        ...options.props,
        modelValue: 'abc',
      },
    });
    expect(wrapper.find('input').element.value).toBe('abc');
  });

  it('sets the value', async () => {
    const wrapper = mount(Input, options);
    const input = wrapper.find('input');

    await input.setValue('abc');

    expect(input.element.value).toBe('abc');
  });

  it(`doesn't emit update when model value unchanged`, async () => {
    const wrapper = mount(Input, {
      ...options,
      props: {
        ...options.props,
        modelValue: 'abc',
      },
    });
    const input = wrapper.find('input');

    await input.setValue('abc');

    expect(input.element.value).toBe('abc');
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
  });

  describe('pattern prop', () => {
    options = {
      ...options,
      props: {
        ...options.props,
        pattern: '[a-z]+',
        modelValue: '',
      },
    };

    it('renders the pattern on the input', () => {
      const wrapper = mount(Input, options);
      const attr = wrapper.attributes();
      expect(attr.pattern).toBe('[a-z]+');
    });

    describe('input modiifier', () => {
      it('accepts keypresses matching the pattern', async () => {
        const wrapper = mount(Input, {
          ...options,
          props: {
            ...options.props,
            patternModifiers: {
              input: true,
            },
          },
        });
        const input = wrapper.find('input');
        await input.setValue('a');
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      });

      it('rejects keypresses not matching the pattern', async () => {
        const wrapper = mount(Input, {
          ...options,
          props: {
            ...options.props,
            patternModifiers: {
              input: true,
            },
            modelValue: '',
          },
        });
        const input = wrapper.find('input');

        await input.setValue('1');
        expect(input.element.value).toBe('');
        expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
      });
    });
  });

  describe('size prop', () => {
    it('does not render size on input', () => {
      const wrapper = mount(Input, {
        ...options,
        props: {
          ...options.props,
          size: 1,
        },
      });
      expect(wrapper.attributes().size).toBeFalsy();
    });

    it('does not allow input past size', async () => {
      const wrapper = mount(Input, {
        ...options,
        props: {
          ...options.props,
          size: 1,
          modelValue: 'a',
        },
      });
      const input = wrapper.find('input');

      await input.setValue('ab');
      expect(input.element.value).toBe('a');
      expect(wrapper.emitted()).not.toHaveProperty('update:modelValue');
    });
  });
});
