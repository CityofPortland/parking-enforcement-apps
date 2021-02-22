<template>
  <nav class="bg-gray-800 text-gray-100">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center overflow-hidden">
          <div class="flex-shrink-0 truncate">
            <!--
              @slot Branding area, should contain app name and logo
            -->
            <slot name="branding"></slot>
          </div>
          <div v-if="hasMenu" class="hidden md:block">
            <!--
              @slot Menu area, should contain navigation menu for the site
            -->
            <slot name="menu"></slot>
          </div>
        </div>
        <div v-if="userMenu" class="hidden md:block">
          <component :is="userMenu" />
        </div>
        <div v-if="hasMenu" class="-mr-2 flex md:hidden">
          <button
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            @click="open = !open"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              :class="{ hidden: open, block: !open }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ hidden: !open, block: open }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="hasMenu" class="md:hidden" :class="{ hidden: !open }">
      <slot name="menu"></slot>
      <div v-if="userMenu">
        <component :is="userMenu" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    userMenu: {
      type: Object
    }
  },
  setup(_props, { slots }) {
    const open = ref(false);

    const hasMenu = !!slots.menu;

    return {
      open,
      hasMenu
    };
  }
});
</script>
