<template>
  <nav :class="headerClasses">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center space-x-3 h-16">
        <div class="flex items-center truncate">
          <!--
            @slot Branding area, should contain app name and logo
          -->
          <slot name="branding"></slot>
        </div>
        <div v-if="hasMenu" class="hidden md:flex md:flex-row flex-grow">
          <!--
              @slot Menu area, should contain navigation menu for the site
            -->
          <slot name="menu"></slot>
        </div>
        <div v-if="hasMenu" class="-mr-2 flex md:hidden flex-grow">
          <button
            class="inline-flex items-center justify-center p-2 ml-auto rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            :class="buttonClasses"
            @click="open = !open"
          >
            <span class="sr-only">Open main menu</span>
            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
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

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div class="md:hidden" :class="{ hidden: !open }">
      <slot name="menu"></slot>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    theme: {
      type: String,
      default: 'gray'
    }
  },
  setup(props, { slots }) {
    const open = ref(false);

    const hasMenu = !!slots.menu;

    const headerClasses = computed(() => {
      const classMap = new Map([
        ['white', []],
        ['cyan', ['bg-cyan-800', 'text-cyan-100']],
        ['gray', ['bg-gray-800', 'text-gray-100']],
        ['orange', ['bg-orange-800', 'text-orange-100']]
      ]);

      return classMap.get(props.theme);
    });

    const buttonClasses = computed(() => {
      const classMap = new Map([
        ['white', []],
        ['cyan', ['hover:bg-cyan-500', 'focus:ring-offset-cyan-600']],
        ['gray', ['hover:bg-gray-600', 'focus:ring-offset-gray-800']],
        ['orange', ['hover:bg-orange-600', 'focus:ring-offset-orange-500']]
      ]);

      return classMap.get(props.theme);
    });

    return {
      open,
      hasMenu,
      headerClasses,
      buttonClasses
    };
  }
});
</script>
