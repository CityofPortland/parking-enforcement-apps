<template>
  <div v-if="hasSearchResults">
    <div
      v-if="permitFound"
      class="bg-white shadow-md overflow-hidden mx-auto m-5 bg-green-200"
    >
      <div class="py-4 px-8 mt-3">
        <div class="flex flex-col mb-8">
          <h2 class="text-gray-900 font-semibold text-2xl tracking-wide mb-2">
            Permit found for '{{ plateSearchedFor }}'
          </h2>
          <p class="text-gray-900 text-base">
            <svg
              class="h-6 w-6 inline text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 27 27"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            The plate '{{ plateSearchedFor }}' has an area parking permit.
          </p>
        </div>

        <div class="py-4">
          For more additional information click here or ??
        </div>
      </div>
    </div>

    <div
      v-else
      class="bg-white shadow-md overflow-hidden mx-auto m-5 bg-red-300"
    >
      <div class="py-4 px-8 mt-3">
        <div class="flex flex-col mb-8">
          <h2 class="text-gray-900 font-semibold text-2xl tracking-wide mb-2">
            Permit not found for '{{ plateSearchedFor }}'
          </h2>
          <p class="text-gray-900 text-base">
            <svg
              class="h-6 w-6 inline text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 27 27"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            The plate '{{ plateSearchedFor }}' does not have an area parking
            permit.
          </p>
        </div>

        <div class="py-4">
          For more additional information click here or ??
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResultsPanel',
  props: {
    plateSearchedFor: {
      type: String,
      required: true
    },
    permitFound: {
      type: Boolean,
      required: true
    },
    hasSearchResults: {
      type: Boolean,
      reqquired: true
    }
  } /*,
  setup(props) {
    const myProps = toRefs(props);

    return {
      myProps
    };
  }*/
});
</script>
