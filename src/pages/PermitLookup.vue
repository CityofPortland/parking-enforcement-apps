<template>
  <h1 class="text-2xl font-bold mb-8">
    {{ t('appHeader') }}
  </h1>
  <section class="max-w-xl flex flex-col space-y-4">
    <i18n-t keypath="help" tag="p" for="seeHere" class="">
      <template v-slot:seeHere>
        <a
          href="https://www.portland.gov/transportation/parking/appp-info"
          class="border-b-2 border-current font-semibold"
          target="_blank"
          >{{ t('seeHere') }}</a
        >
      </template>
    </i18n-t>
    <form
      class="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4"
      @submit.prevent="handleSubmit"
    >
      <Input
        id="licensePlateInput"
        name="licensePlate"
        type="text"
        :placeholder="t('enterPlatePlaceholder')"
        v-model="licensePlate"
        required
        pattern="[A-Za-z0-9]+"
      />

      <Select
        id="zoneInput"
        name="zone"
        v-model="zone"
        required
        :placeholder="t('selectZone')"
      >
        <option v-for="zone in zones" :key="zone.value" :value="zone.value">{{
          zone.text
        }}</option>
      </Select>

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
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import Button from '@/elements/button/Button.vue';
import Input from '@/elements/inputs/Input.vue';
import Result from '@/components/permit/PermitLookupResult.vue';
import Select from '@/elements/inputs/Select.vue';

export default {
  name: 'PermitLookup',
  components: {
    Button,
    Input,
    Result,
    Select
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

<i18n>
{
  "en": {
    "search" : "Search",
    "enterPlatePlaceholder" : "Enter License Plate",
    "selectZone" : "Select Zone",
    "appHeader" : "Area Parking Permit Lookup",
    "help": "Use the form below to enter a vehicle's license plate number, and select a parking permit zone, then query whether the vehicle has an active parking permit for the selected zone. For more information {seeHere}.",
    "seeHere": "see here"
  },
  "no": {
    "search" : "Søk",
    "enterPlatePlaceholder": "Skriv inn lisensplaten",
    "selectZone" : "Velg sone",
    "appHeader" : "Område parkering tillatelse oppslag",
    "help" : "Bruk skjemaet nedenfor for å skrive inn bilens lisensnummer, og velg en parkeringsstillatelsone, og spør deretter om kjøretøyet har en aktiv parkeringstillatelse for den valgte sonen. For mer informasjon {seeHere}.",
    "seeHere" : "se her"
  }
}
</i18n>
