<template>
  <svg
    class="h-12 w-12 mx-auto"
    :class="iconColorClass"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 23 23"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="svgPath"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'StatusIcon',
  props: {
    isSuccessIcon: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const iconColorClass = computed(() => {
      if (props.isSuccessIcon) {
        return 'text-green-600';
      } else {
        return 'text-red-600';
      }
    });

    const svgPath = computed(() => {
      if (props.isSuccessIcon) {
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      } else {
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      }
    });

    return {
      iconColorClass,
      svgPath
    };
  }
});
</script>
