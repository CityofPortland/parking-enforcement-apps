<template>
  <li class="flex md:rounded-md text-sm font-medium">
    <a
      :href="url"
      class="flex px-4 py-2 w-full md:rounded-md text-sm font-medium"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavItem',
  props: {
    url: {
      type: String,
      required: true
    }
  }
});
</script>
