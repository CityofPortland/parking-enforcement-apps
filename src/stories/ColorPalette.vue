<template>
  <ul class="flex -mx-3">
    <li
      v-for="(weight, index) in weights"
      :key="index"
      class="flex flex-col my-1 mx-3"
    >
      <span
        class="w-16 h-12 rounded-lg"
        :class="[`bg-${color}-${weight}`]"
      ></span>
      <div class="flex flex-col">
        <span>{{ weight }}</span>
        <span class="text-base text-gray-500">{{
          colorValue(color, weight)
        }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

export default {
  name: 'ColorPalette',
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    };
  },
  methods: {
    colorValue(color, weight) {
      return fullConfig.theme.colors[color][weight];
    }
  }
};
</script>
