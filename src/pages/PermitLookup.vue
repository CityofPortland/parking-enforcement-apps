<template>
  <article class="grid grid-cols-1 gap-8">
    <header class="grid grid-cols-1 gap-8">
      <h1 class="text-2xl font-bold">
        {{ t('appHeader') }}
      </h1>
      <img
        class="max-h-24 px-4"
        src="../assets/pbot_appp_logo.png"
        alt="PBOT Area Parking Permit Program logo"
      />
    </header>
    <main class="max-w-xl flex flex-col space-y-4">
      <i18n-t keypath="help" tag="p">
        <template v-slot:licenseFAQLink>
          <Anchor
            url="https://www.portland.gov/transportation/parking/pay-plate-faqs#toc-how-do-i-enter-my-license-plate-"
            >{{ t('licenseFAQLink') }}
          </Anchor>
        </template>
        <template v-slot:generalHelp>
          <Anchor
            url="https://www.portland.gov/transportation/parking/appp-info"
            >{{ t('generalHelp') }}</Anchor
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
          aria-label="License plate"
          type="text"
          :placeholder="t('enterPlatePlaceholder')"
          required
          pattern="[A-Za-z0-9]+"
          :patternModifiers="{ input: true }"
          :size="10"
          v-model.uppercase="licensePlate"
        />

        <Select
          id="zoneInput"
          name="zone"
          aria-label="Area parking permit zone"
          v-model="zone"
          required
          :placeholder="t('selectZone')"
        >
          <option v-for="zone in zones" :key="zone.value" :value="zone.value">{{
            zone.text
          }}</option>
        </Select>

        <Button
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
    </main>
  </article>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import Anchor from '@/elements/anchor/Anchor.vue';
import Button from '@/elements/button/Button.vue';
import Input from '@/elements/inputs/Input.vue';
import Result from '@/components/permit/PermitLookupResult.vue';
import Select from '@/elements/inputs/Select.vue';

export default {
  name: 'PermitLookup',
  components: {
    Anchor,
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
    "help": "Use the form below to search for a vehicle's active parking permit in a selected zone. For help entering license plates, {licenseFAQLink}, and for information on the area parking permit program, {generalHelp}.",
    "licenseFAQLink":"view our license plate entry FAQ",
    "generalHelp": "view our area parking permit guide"
  },
  "no": {
    "search" : "Søk",
    "enterPlatePlaceholder": "Skriv inn lisensplaten",
    "selectZone" : "Velg sone",
    "appHeader" : "Område parkering tillatelse oppslag",
    "help" : "Bruk skjemaet nedenfor for å skrive inn bilens lisensnummer, og velg en parkeringsstillatelsone, og spør deretter om kjøretøyet har en aktiv parkeringstillatelse for den valgte sonen. For mer informasjon {generalHelp}.",
    "generalHelp" : "se her"
  }
}
</i18n>
