<template>
  <div v-if="hasSearchResults">
    <div
      class="p-5 items-center space-y-4 rounded-md justify-center shadow-md"
      :class="permitFound ? 'bg-green-200' : 'bg-red-300'"
    >
      <StatusIcon :isSuccessIcon="permitFound" />

      <span class="font-semibold block text-2xl text-center">
        <!-- Permit Found for '{{ plateSearchedFor }}'! -->
        {{ TopBannerMessage }}
      </span>

      <span class="block text-center">
        {{ BottomBannerMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import StatusIcon from '../statusicon/StatusIcon.vue';

export default defineComponent({
  name: 'ResultsPanel',
  components: { StatusIcon },
  props: {
    plateSearchedFor: {
      type: String,
      required: true
    },
    zoneSearchedFor: {
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
  },

  setup(props) {
    const TopBannerMessage = computed(() => {
      if (props.permitFound) {
        return `Permit Found for '${props.plateSearchedFor}'!`;
      } else {
        return `No permit found for '${props.plateSearchedFor}' in '${props.zoneSearchedFor}'.`;
      }
    });

    const BottomBannerMessage = computed(() => {
      if (props.permitFound) {
        return `Vehicle with license '${props.plateSearchedFor}' has an area parking permit in '${props.zoneSearchedFor}'.`;
      } else {
        return `Vehicle with license '${props.plateSearchedFor}' does not have an area parking permit in '${props.zoneSearchedFor}'.`;
      }
    });

    return {
      TopBannerMessage,
      BottomBannerMessage
    };
  }
});
</script>
