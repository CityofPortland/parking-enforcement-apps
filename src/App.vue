<template>
  <Header color="white" open="open">
    <template v-slot:branding>
      <Logo class="w-16 mr-3 hidden md:inline-flex" />
      <h1 class="truncate">Parking Enforcement - Area Permit Lookup</h1>
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
export default defineComponent({
  components: {
    Header,
    Logo,
    PermitLookup
  }
});
</script>

<style lang="scss"></style>
