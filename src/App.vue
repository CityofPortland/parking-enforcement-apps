<template>
  <Header
    color="white"
    :open="menuOpen"
    @toggle="menuOpen = !menuOpen"
    :lang="locale"
  >
    <template v-slot:branding>
      <a href="/" class="w-full flex items-center">
        <Logo class="w-16 mr-3 flex-shrink-0" />
        <span class="truncate text-xl">Parking Enforcement</span>
      </a>
    </template>

    <template v-slot:menu>
      <div class="p-4 md:ml-auto">
        <select
          v-model="locale"
          class="px-3 py-2 placeholder-gray-600 rounded-md text-gray-900 border border-gray-500 shadow-md bg-gray-100"
        >
          <option value="en">English</option>
          <option value="no">Norwegian</option>
        </select>
      </div>
    </template>
  </Header>
  <main class="max-w-7xl mx-auto px-4 mt-8" :lang="locale">
    <h1 class="text-2xl font-bold mb-8">Area Parking Permit Lookup</h1>
    <section class="max-w-xl">
      <p>
        Use the form below to enter a vehicle's license plate number, and select
        a parking permit zone, then query whether the vehicle has an active
        parking permit for the selected zone. For more information
        <a
          href="https://www.portland.gov/transportation/parking/appp-info"
          class="border-b-2 border-current font-semibold"
          >see here</a
        >.
      </p>
      <PermitLookup class="mt-8" />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Header from '@/components/header/Header.vue';
import Logo from '@/assets/Logo.vue';
import PermitLookup from '@/components/PermitLookup.vue';

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    const menuOpen = ref(false);

    return { t, locale, menuOpen };
  },
  components: {
    Header,
    Logo,
    PermitLookup
  }
});
</script>

<style lang="scss"></style>
