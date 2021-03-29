<template>
  <Header
    color="white"
    :open="menuOpen"
    @toggle="menuOpen = !menuOpen"
    :lang="locale"
  >
    <template v-slot:branding>
      <a href="/" class="w-full flex items-center">
        <Logo class="w-16 md:w-20 mr-3 flex-shrink-0" />
        <span class="truncate text-xl">Parking Enforcement</span>
      </a>
    </template>

    <template v-slot:menu>
      <div class="p-4 md:ml-auto">
        <select
          id="locale"
          name="locale"
          aria-label="Select locale"
          v-model="locale"
          class="px-3 py-2 placeholder-gray-600 rounded-md text-gray-900 border border-gray-500 shadow-md bg-gray-100 focus:outline-none focus:ring"
        >
          <option value="en">English</option>
          <option value="no">Norwegian</option>
        </select>
      </div>
    </template>
  </Header>
  <main class="max-w-7xl mx-auto px-4 mt-8" :lang="locale">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Header from '@/components/header/Header.vue';
import Logo from '@/assets/Logo.vue';

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    const menuOpen = ref(false);

    return { t, locale, menuOpen };
  },
  components: {
    Header,
    Logo
  }
});
</script>
