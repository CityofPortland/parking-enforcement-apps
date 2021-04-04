<template>
  <a :href="url">
    <span class="border-b-2 border-current font-medium hover:font-bold">
      <slot>{{ url }}</slot>
    </span>
    <Icon v-if="external" type="external-link" class="h-4 w-4 ml-1 inline" />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Icon from '@/elements/icon/Icon.vue';

export default defineComponent({
  name: 'Anchor',
  components: { Icon },
  props: {
    url: {
      type: String,
      required: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    return {
      external: props.url.startsWith('http')
    };
  }
});
</script>
