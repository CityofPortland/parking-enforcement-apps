<template>
  <button type="button" :class="classes" @click="onClick">
    <!--
      @slot Default slot that will be placed in the button
    -->
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { ButtonSize, ButtonProps } from './Button.types';

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as () => ButtonSize,
      default: 'medium'
    }
  },
  emits: ['onClick'],
  setup(props: ButtonProps, context) {
    const classes = computed(() => {
      const classes = [];

      const sizeMap = new Map([
        ['small', ['px-2', 'py-1', 'text-sm']],
        ['medium', ['px-3', 'py-2', 'text-base']],
        ['large', ['px-4', 'py-3', 'text-lg']]
      ]);

      sizeMap.has(props.size) && classes.push(sizeMap.get(props.size));

      classes.push(
        ...(props.primary
          ? [
              'bg-blue-500',
              'text-white',
              'hover:bg-blue-700',
              'focus:bg-blue-700'
            ]
          : [
              'bg-gray-100',
              'text-gray-900',
              'hover:bg-gray-200',
              'focus:bg-gray-200'
            ]),
        ...[
          'focus:outline-none',
          'focus:ring',
          'focus:border-blue-100',
          'rounded-md',
          'shadow'
        ]
      );

      return classes;
    });

    const onClick = () => {
      context.emit('onClick');
    };

    return {
      classes,
      onClick
    };
  }
});
</script>
