<template>
  <Box
    :color="permit.isValid ? 'green' : 'red'"
    variant="light"
    class="p-6 flex flex-col items-center justify-center space-y-4 border border-current rounded-md shadow-md"
  >
    <Icon
      :type="permit.isValid ? 'check-circle' : 'x-circle'"
      class="h-12 w-12"
    />

    <span class="font-semibold block text-2xl text-center">
      <!-- Permit Found for '{{ plateSearchedFor }}'! -->
      {{ summary }}
    </span>

    <p class="block text-center">
      {{ body }}
    </p>

    <i18n-t
      v-if="!permit.isValid"
      keypath="permitNotFoundMap"
      tag="p"
      class="block text-center"
    >
      <template v-slot:useMapLink>
        <Anchor
          url="https://pdx.maps.arcgis.com/apps/MapSeries/index.html?appid=ad171d005d4442bba3c640735d070aa3&entry=3"
          target="_blank"
          rel="noopener"
          >{{ t('useMap') }}</Anchor
        >
      </template>
    </i18n-t>

    <i18n-t
      v-if="!permit.isValid"
      keypath="permitNotFoundCaveat"
      tag="p"
      class="block text-center"
    >
      <template v-slot:callEnforcementLink>
        <Anchor url="tel:503-823-5195">503-823-5195</Anchor>
      </template>
    </i18n-t>
  </Box>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Anchor from '@/elements/anchor/Anchor.vue';
import Box from '@/elements/box/Box';
import Icon from '@/elements/icon/Icon.vue';
import { AreaPermit } from '@/store/types';

export default defineComponent({
  name: 'PermitLookupResult',
  components: { Anchor, Box, Icon },
  props: {
    permit: {
      type: Object as () => AreaPermit,
      required: true
    }
  },

  setup(props) {
    const { t } = useI18n();

    return {
      t,
      licensePlate: props.permit.licensePlate,
      zone: props.permit.zone,
      summary: computed(() =>
        props.permit.isValid
          ? t('permitFoundHeader', { licensePlate: props.permit.licensePlate })
          : t('permitNotFoundHeader', {
              licensePlate: props.permit.licensePlate
            })
      ),
      body: computed(() =>
        props.permit.isValid
          ? t('permitFoundBody', {
              licensePlate: props.permit.licensePlate,
              zone: props.permit.zone.text
            })
          : t('permitNotFoundBody', {
              licensePlate: props.permit.licensePlate,
              zone: props.permit.zone.text
            })
      )
    };
  }
});
</script>

<i18n>
{
  "en": {
    "permitFoundHeader": "Active area parking permit found for '{licensePlate}'!",
    "permitNotFoundHeader": "No active area parking permit found for '{licensePlate}'.",
    "permitFoundBody": "Vehicle with license plate '{licensePlate}' has an active area parking permit in '{zone}'.",
    "permitNotFoundBody": "Vehicle with license plate '{licensePlate}' does not have an active area parking permit in '{zone}'.",
    "permitNotFoundMap": "{useMapLink} to view visitor time limits and enforcement hours in your zone.",
    "useMap": "Use the zone enforcement map",
    "permitNotFoundCaveat": "A vehicle without an active area parking permit can park up to the visitor time limit in the zone. Vehicles might have other permits allowing them to park in this area, not all vehicles with a result ‘no active area parking permit found’ will be in violation. If you’d like to report this vehicle to Parking Enforcement call {callEnforcementLink}, choose option 1 to report a vehicle."
  },
  "no": {
    "permitFoundHeader": "Tillatelse funnet for '{licensePlate}'!",
    "permitNotFoundHeader": "Tillatelse ikke funnet for '{licensePlate}'.",
    "permitFoundBody": "Kjøretøy med lisens '{licensePlate}' har områdeparkeringstillatelse i '{zone}'.",
    "permitNotFoundBody": "Kjøretøy med lisens  '{licensePlate}' har ikke områdeparkeringstillatelse i '{zone}'."    
  }
}
</i18n>
