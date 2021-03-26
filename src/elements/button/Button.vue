<template>
  <button
    type="button"
    :class="[...sizeClasses, ...colorClasses, ...baseClasses]"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { ButtonProps, ButtonSize, ButtonColor } from './Button.types';

export default defineComponent({
  name: 'pbot-button',
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String as () => ButtonColor,
      default: 'gray'
    },
    size: {
      type: String as () => ButtonSize,
      default: 'medium'
    }
  },
  emits: ['click'],
  setup(props: ButtonProps, context) {
    const baseClasses = [
      'rounded-md',
      'shadow',
      'focus:outline-none',
      'focus:ring'
    ];

    const sizeClasses = computed(() => {
      const sizeMap = new Map<ButtonSize, string[]>([
        ['small', ['px-2', 'py-1', 'text-sm']],
        ['medium', ['px-3', 'py-2']],
        ['large', ['px-4', 'py-3', 'text-lg']]
      ]);

      return props.size && sizeMap.get(props.size);
    });

    const colorClasses = computed(() => {
      const colorMap = new Map<ButtonColor, string[]>([
        ['gray', ['bg-gray-100', 'text-gray-900']],
        ['blue', ['bg-blue-500', 'text-blue-100']],
        ['red', ['bg-red-600', 'text-red-100']],
        ['green', ['bg-green-500', 'text-green-900']]
      ]);

      return props.color && colorMap.get(props.color);
    });

    const onClick = () => {
      context.emit('click');
    };

    return {
      baseClasses,
      sizeClasses,
      colorClasses,
      onClick
    };
  }
});
</script>
