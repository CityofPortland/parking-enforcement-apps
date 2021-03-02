<template>
  <div class="max-w-xl mx-auto content-center">
    <form @submit.prevent="LookupPlate">
      <div class="bg-white shadow p-4 flex">
        <span class="w-auto flex justify-end items-center text-gray-700 p-2">
          <svg
            class="h-6 w-6 inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 27 27"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          class="w-full rounded p-2 border-blue-500 pr-4"
          type="text"
          placeholder="Search by license plate"
          v-model="plateLookupString"
        />
        <button
          class="w-48 bg-blue-500 rounded text-white p-2 pl-4 pr-4"
          :class="{
            'opacity-50': WaitingForSearchResults,
            'hover:bg-blue-400': !WaitingForSearchResults
          }"
          :disabled="WaitingForSearchResults"
        >
          <p class="font-semibold text-sm">Search &gt;&gt;</p>
        </button>
      </div>
    </form>

    <!--<form @submit.prevent="LookupPlate">
      <input
        type="text"
        class="rounded-md px-4 py-3 mt-3 focus:outline-none bg-gray-200 ring-2"
        v-model="plateLookupString"
        style="margin-right: 5px"
      />
      <input
        type="submit"
        class="text-sm py-3 rounded-md font-semibold text-white bg-blue-500 ring-2"
        value="Lookup &gt;&gt;"
        :disabled="
          plateLookupString == '' ||
            PlateLookupResponse.plateSearchedFor == plateLookup + '/'
        "
      /><br /><br />
    </form>-->

    <ResultsPanel
      :plateSearchedFor="PlateLookupResponse.plateSearchedFor"
      :permitFound="PlateLookupResponse.permitFound"
      :hasSearchResults="PlateLookupResponse.hasSearchResults"
    />

    <div
      class="bg-white shadow-md overflow-hidden mx-auto m-5 bg-grey-300"
      v-if="IsLoading"
    >
      <div class="py-4 px-8 mt-3">
        <div class="flex flex-col mb-8">
          <h2 class="text-gray-900 font-semibold text-2xl tracking-wide mb-2">
            Searching for '{{ plateLookupString }}'
          </h2>
          <p class="text-gray-900 text-base flex justify-center">
            <svg
              class="animate-spin h-10 w-10 inline text-grey-800"
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
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultsPanel from './resultspanel/Resultspanel.vue';
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

export default {
  name: 'PermitLookup',

  setup() {
    const WaitingForSearchResults = ref(false);
    const plateLookupString = ref('');
    const IsLoading = ref(false);

    const plateLookup = computed(() => {
      return plateLookupString.value;
    });

    const PlateLookupResponse = reactive({
      hasSearchResults: false,
      permitFound: false,
      plateSearchedFor: ''
    });

    function LookupPlate() {
      if (plateLookupString.value != '') {
        IsLoading.value = true;
        PlateLookupResponse.hasSearchResults = false;
        PlateLookupResponse.permitFound = false;
        WaitingForSearchResults.value = true;
        const plateLookupData = `{ "query": "{ areapermit(id:\\"${plateLookupString.value}\\") { Code, HasPermit } } " }`;
        setTimeout(() => {
          axios
            .post('http://localhost:4000/graphql', plateLookupData, {
              headers: {
                'content-type': 'application/json'
              }
            })
            .then(function(response) {
              //console.log('response', response.data.data.areapermit)

              PlateLookupResponse.hasSearchResults = true;
              PlateLookupResponse.plateSearchedFor =
                response.data.data.areapermit.Code;
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
        }, 1000);
      } else {
        PlateLookupResponse.hasSearchResults = false;
        PlateLookupResponse.permitFound = false;
      }
    }

    return {
      ResultsPanel,
      WaitingForSearchResults,
      IsLoading,
      LookupPlate,
      plateLookupString,
      PlateLookupResponse,
      plateLookup
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
