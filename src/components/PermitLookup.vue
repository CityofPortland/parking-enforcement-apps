<template>
  <div class="flex flex-col space-y-4">
    <form
      class="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4"
      @submit.prevent="handleSubmit"
    >
      <input
        id="licensePlateInput"
        name="licensePlate"
        class="rounded-md p-2 border border-gray-500 shadow-md bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring"
        type="text"
        :placeholder="t('enterplateplaceholder')"
        v-model="licensePlate"
        required
      />

      <select
        id="zoneInput"
        name="zone"
        v-model="zone"
        class="rounded-md p-2 border border-gray-500 shadow-md bg-gray-100 focus:outline-none focus:ring"
        required
      >
        <option value="" disabled>{{ t('select-zone') }}</option>
        <option v-for="zone in zones" :key="zone.value" :value="zone.value">{{
          zone.text
        }}</option>
      </select>

      <Button
        type="submit"
        :label="t('search')"
        color="blue"
        :class="{
          'opacity-50': isLoading
        }"
        :disabled="isLoading"
      >
        <div
          v-if="isLoading"
          class="flex items-center justify-center space-x-3"
        >
          <span>Loading</span>
          <svg
            class="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <span v-else>{{ t('search') }}</span>
      </Button>
    </form>

    <Result v-if="permit" :permit="permit" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import Button from '@/elements/button/Button.vue';
import Result from '@/components/permit/PermitLookupResult.vue';

export default {
  name: 'PermitLookup',
  components: {
    Button,
    Result
  },
  setup() {
    const { t, locale } = useI18n();
    const licensePlate = ref('');
    const zone = ref('');

    const store = useStore();

    store.dispatch('retrieveZones');

    function handleSubmit() {
      if (licensePlate.value && zone.value) {
        store.dispatch('searchLicense', {
          licensePlate: licensePlate.value,
          zone: zone.value
        });
      }
    }

    return {
      t,
      locale,
      licensePlate,
      zone,
      handleSubmit,
      isLoading: computed(() => store.state.loading),
      permit: computed(() => store.state.permit),
      zones: computed(() => store.state.zones)
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<i18n>
{
  "en": {
    "search" : "Search",
    "enterplateplaceholder" : "Enter License Plate",
    "select-zone" : "Select Zone",
  },
  "no": {
    "search" : "Søk",
    "enterplateplaceholder": "Skriv inn lisensplaten",
    "select-zone" : "Velg sone",
  }
}
</i18n>
