<template>
  <div class="flex flex-col space-y-4">
    <form
      class="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4"
      @submit.prevent="LookupPlate"
    >
      <input
        class="rounded-md p-2 border placeholder-gray-500 border-gray-500 shadow-md bg-gray-100"
        type="text"
        :placeholder="t('enterplateplaceholder')"
        v-model="plateLookupString"
        required
      />

      <select
        v-model="zoneLookupString"
        class="rounded-md p-2 border border-gray-500 shadow-md bg-gray-100"
        required
      >
        <option value="">{{ t('select-zone') }}</option>
        <option v-for="item in areaZones" :key="item" :value="item.Value">{{
          item.Text
        }}</option>
      </select>

      <Button
        type="submit"
        :label="t('search')"
        color="blue"
        :class="{
          'opacity-50': WaitingForSearchResults,
          'hover:bg-blue-400': !WaitingForSearchResults
        }"
        :disabled="WaitingForSearchResults"
      />
    </form>

    <ResultsPanel
      :plateSearchedFor="PlateLookupResponse.plateSearchedFor"
      :zoneSearchedFor="PlateLookupResponse.zoneSearchedFor"
      :permitFound="PlateLookupResponse.permitFound"
      :hasSearchResults="PlateLookupResponse.hasSearchResults"
    />

    <div v-if="IsLoading">
      <div
        class="p-5 items-center space-y-4 rounded-md justify-center shadow-md bg-gray-200"
      >
        <svg
          class="animate-spin h-12 w-12 mx-auto text-grey-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>

        <span class="font-semibold block text-2xl text-center">
          <!-- Permit Found for '{{ plateSearchedFor }}'! -->
          Searching for '{{ plateLookupString }}'
        </span>

        <span class="block text-center">
          Searching for '{{ plateLookupString }}' in zone '{{
            zoneLookupString
          }}'
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import axios from 'axios';

import Button from '@/elements/button/Button.vue';
import ResultsPanel from './resultspanel/Resultspanel.vue';

export default {
  name: 'PermitLookup',
  components: {
    Button
  },
  setup() {
    const { t, locale } = useI18n();
    const WaitingForSearchResults = ref(false);
    const plateLookupString = ref('');
    const zoneLookupString = ref('');
    const IsLoading = ref(false);
    const areaZones = ref([]);

    const PlateLookupResponse = reactive({
      hasSearchResults: false,
      permitFound: false,
      plateSearchedFor: '',
      zoneSearchedFor: ''
    });

    function GetAreaZones() {
      const areaPermitZoneQuery = `{ "query": "{ areapermitzone { Text Value } }" }`;

      axios
        .post('http://localhost:4000/graphql', areaPermitZoneQuery, {
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(function(response) {
          areaZones.value = response.data.data.areapermitzone;
          console.log(response.data.data.areapermitzone);
        });
    }

    GetAreaZones();

    function LookupPlate() {
      if (plateLookupString.value != '') {
        //console.log('zone lookup:', zoneLookupString.value);

        IsLoading.value = true;
        PlateLookupResponse.plateSearchedFor = plateLookupString.value;
        PlateLookupResponse.zoneSearchedFor = zoneLookupString.value;
        PlateLookupResponse.hasSearchResults = false;
        PlateLookupResponse.permitFound = false;
        WaitingForSearchResults.value = true;
        const plateLookupData = `{ "query": "{ areapermit(id:\\"${plateLookupString.value}\\", zone:\\"${zoneLookupString.value}\\") { Code, Zone, HasPermit } } " }`;

        setTimeout(() => {
          axios
            .post('http://localhost:4000/graphql', plateLookupData, {
              headers: {
                'content-type': 'application/json'
              }
            })
            .then(function(response) {
              //console.log('Zone returned:', response.data.data.areapermit.Zone);

              PlateLookupResponse.hasSearchResults = true;
              //PlateLookupResponse.plateSearchedFor = response.data.data.areapermit.Code;
              plateLookupString.value = response.data.data.areapermit.Code;
              PlateLookupResponse.permitFound = response.data.data.areapermit
                .HasPermit
                ? true
                : false;
            })
            .catch(function(err) {
              console.log('Error', err);
              WaitingForSearchResults.value = false;
            })
            .finally(function() {
              IsLoading.value = false;
              WaitingForSearchResults.value = false;
            });
        }, 250);
      } else {
        PlateLookupResponse.hasSearchResults = false;
        PlateLookupResponse.permitFound = false;
      }
    }

    return {
      t,
      locale,
      ResultsPanel,
      WaitingForSearchResults,
      IsLoading,
      LookupPlate,
      plateLookupString,
      zoneLookupString,
      PlateLookupResponse,
      areaZones
      //,plateLookup
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
