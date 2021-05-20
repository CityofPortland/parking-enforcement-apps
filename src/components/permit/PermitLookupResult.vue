<template>
  <Message
    :color="permit.isValid ? 'green' : 'red'"
    variant="light"
    :icon="permit.isValid ? 'check-circle' : 'x-circle'"
    :summary="summary"
  >
    <Box class="flex flex-col space-y-3">
      <i18n-t
        :keypath="permit.isValid ? 'permitFoundBody' : 'permitNotFoundBody'"
        tag="p"
      >
        <template v-slot:licensePlate>{{ permit.licensePlate }}</template>
        <template v-slot:zone>Zone {{ permit.zone.id }}</template>
      </i18n-t>

      <ul v-if="!permit.isValid" class="pl-4 list-disc list-outside">
        <li v-for="(info, index) in permit.zone.enforcementInfo" :key="index">
          {{ capitalize(info.visitorLimit) }} during the hours of
          {{ info.enforcementHours }}
        </li>
      </ul>

      <i18n-t v-if="!permit.isValid" keypath="permitNotFoundCaveat" tag="p">
        <template v-slot:callEnforcementLink>
          <Anchor url="tel:503-823-5195">503-823-5195</Anchor>
        </template>
      </i18n-t>
    </Box>
  </Message>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import Anchor from '@/elements/anchor/Anchor.vue';
import Message from '@/components/message/Message.vue';
import { AreaPermit } from '@/store/types';

export default defineComponent({
  name: 'PermitLookupResult',
  components: { Anchor, Message },
  props: {
    permit: {
      type: Object as () => AreaPermit,
      required: true,
    },
  },

  setup(props) {
    const { t } = useI18n();

    return {
      t,
      licensePlate: props.permit.licensePlate,
      zone: props.permit.zone,
      capitalize: (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      summary: computed(() =>
        props.permit.isValid
          ? t('permitFoundHeader', { licensePlate: props.permit.licensePlate })
          : t('permitNotFoundHeader', {
              licensePlate: props.permit.licensePlate,
            })
      ),
    };
  },
});
</script>

<i18n>
{
  "en": {
    "permitFoundHeader": "Active area parking permit found for '{licensePlate}'!",
    "permitNotFoundHeader": "No active area parking permit found for '{licensePlate}'.",
    "permitFoundBody": "Vehicle with license plate '{licensePlate}' has an active area parking permit in '{zone}'.",
    "permitNotFoundBody": "Vehicle with license plate '{licensePlate}' does not have an active area parking permit in '{zone}'. Vehicles without an active area parking permit in '{zone}' can park up to the following time limits:",
    "permitNotFoundMap": "{useMapLink} to view visitor time limits and enforcement hours in your zone.",
    "useMap": "Use the zone enforcement map",
    "permitNotFoundCaveat": "Vehicles may have other permits allowing them to park in this area. Not all vehicles with a ‘no active area parking permit found’ result will be in violation. If you’d like to report this vehicle to Parking Enforcement, call {callEnforcementLink} and choose option 1 to report a vehicle."
  },
  "no": {
    "permitFoundHeader": "Tillatelse funnet for '{licensePlate}'!",
    "permitNotFoundHeader": "Tillatelse ikke funnet for '{licensePlate}'.",
    "permitFoundBody": "Kjøretøy med lisens '{licensePlate}' har områdeparkeringstillatelse i '{zone}'.",
    "permitNotFoundBody": "Kjøretøy med lisens  '{licensePlate}' har ikke områdeparkeringstillatelse i '{zone}'."
  }
}
</i18n>
