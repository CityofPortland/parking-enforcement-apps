<template>
  <Box
    :color="permit.isValid ? 'green' : 'red'"
    variant="light"
    class="p-6 flex flex-col items-center justify-center space-y-4 border border-current rounded-md shadow-md"
  >
    <Icon :type="permit.isValid ? 'check' : 'x-circle'" class="h-12 w-12" />

    <span class="font-semibold block text-2xl text-center">
      <!-- Permit Found for '{{ plateSearchedFor }}'! -->
      {{ summary }}
    </span>

    <span class="block text-center">
      {{ body }}
    </span>
  </Box>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Box from '@/elements/box/Box';
import Icon from '@/elements/icon/Icon.vue';
import { AreaPermit } from '@/store/types';

export default defineComponent({
  name: 'PermitLookupResult',
  components: { Box, Icon },
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
    "permitFoundHeader": "Permit Found for '{licensePlate}'!",
    "permitNotFoundHeader": "No permit found for '{licensePlate}'.",
    "permitFoundBody": "Vehicle with license '{licensePlate}' has an area parking permit in '{zone}'.",
    "permitNotFoundBody": "Vehicle with license '{licensePlate}' does not have an area parking permit in '{zone}'."
  },
  "no": {
    "permitFoundHeader": "Tillatelse funnet for '{licensePlate}'!",
    "permitNotFoundHeader": "Tillatelse ikke funnet for '{licensePlate}'.",
    "permitFoundBody": "Kjøretøy med lisens '{licensePlate}' har områdeparkeringstillatelse i '{zone}'.",
    "permitNotFoundBody": "Kjøretøy med lisens  '{licensePlate}' har ikke områdeparkeringstillatelse i '{zone}'."    
  }
}
</i18n>
