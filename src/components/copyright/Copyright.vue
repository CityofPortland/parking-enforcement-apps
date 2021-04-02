<template>
  <small class="grid grid-cols-1 gap-2">
    <slot>
      <h2 class="font-semibold text-lg">City of Portland, Oregon</h2>
      <img class="w-32 h-32" alt="Portland City Seal" src="./city_seal.png" />
      <p class="text-gray-700 text-base">© Copyright {{ copyrightDate }}</p>
    </slot>
  </small>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    startDate: {
      type: Object as PropType<Date>,
      required: false
    }
  },
  setup(props) {
    const startYear = props.startDate && props.startDate.getFullYear();

    return {
      copyrightDate: `${
        startYear ? startYear + '-' : ''
      }${new Date().getFullYear()}`
    };
  }
});
</script>
