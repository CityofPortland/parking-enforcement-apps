<template>
  <Header color="white" open="open">
    <template v-slot:branding>
      <Logo class="w-16 mr-3 hidden md:inline-flex" />
      <h1 class="truncate">Parking Enforcement - Area Permit Lookup</h1>
      <select
          v-model="locale"
          class="h-10 pl-3 pr-6 text-base placeholder-gray-600 border
          rounded-md float-right"
        >
          <option value="en">English</option>
          <option value="no">Norwegian</option>
        </select>
    </template>
  </Header>

  <div class="p-5">
    <PermitLookup />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/header/Header.vue';
import PermitLookup from './components/PermitLookup.vue';
import Logo from './assets/Logo.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  components: {
    Header,
    Logo,
    PermitLookup
  }
});
</script>

<style lang="scss"></style>
