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
import { useI18n } from 'vue-i18n';

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
    const { t } = useI18n();

    const TopBannerMessage = computed(() => {
      if (props.permitFound) {
        return t('permitFoundHeader', {
          plateSearchedFor: props.plateSearchedFor
        });
      } else {
        return t('permitNotFoundHeader', {
          plateSearchedFor: props.plateSearchedFor
        });
      }
    });

    const BottomBannerMessage = computed(() => {
      if (props.permitFound) {
        return t('permitFoundBody', {
          plateSearchedFor: props.plateSearchedFor,
          zoneSearchedFor: props.zoneSearchedFor
        });
        //return `Vehicle with license '${props.plateSearchedFor}' has an area parking permit in '${props.zoneSearchedFor}'.`;
      } else {
        return t('permitNotFoundBody', {
          plateSearchedFor: props.plateSearchedFor,
          zoneSearchedFor: props.zoneSearchedFor
        });
      }
    });

    return {
      t,
      TopBannerMessage,
      BottomBannerMessage
    };
  }
});
</script>

<i18n>
{
  "en": {
    "vehicle" : "vehicle",
    "permitFoundHeader": "Permit Found for '{plateSearchedFor}'!",
    "permitNotFoundHeader": "No permit found for '{plateSearchedFor}'.",
    "permitFoundBody": "Vehicle with license '{plateSearchedFor}' has an area parking permit in '{zoneSearchedFor}'.",
    "permitNotFoundBody": "Vehicle with license '{plateSearchedFor}' does not have an area parking permit in '{zoneSearchedFor}'."
  },
  "no": {
    "vehicle": "kjøretøy",
    "permitFoundHeader": "Tillatelse funnet for '{plateSearchedFor}'!",
    "permitNotFoundHeader": "Tillatelse ikke funnet for '{plateSearchedFor}'.",
    "permitFoundBody": "Kjøretøy med lisens '{plateSearchedFor}' har områdeparkeringstillatelse i '{zoneSearchedFor}'.",
    "permitNotFoundBody": "Kjøretøy med lisens  '{plateSearchedFor}' har ikke områdeparkeringstillatelse i '{zoneSearchedFor}'."    
  }
}
</i18n>
