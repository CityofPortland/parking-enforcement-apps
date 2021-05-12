<template>
  <Box
    :color="permit.isValid ? 'green' : 'red'"
    variant="light"
    class="flex flex-col md:flex-row p-6 border border-current rounded-md shadow-md"
  >
    <Box class="flex-shrink-0 self-center md:self-start md:mt-1 md:mr-4">
      <Icon
        :type="permit.isValid ? 'check-circle' : 'x-circle'"
        class="h-10 w-10"
      />
    </Box>

    <Box class="flex flex-col space-y-3">
      <i18n-t
        :keypath="permit.isValid ? 'permitFoundHeader' : 'permitNotFoundHeader'"
        tag="p"
        class="font-semibold text-2xl leading-snug"
      >
        <template v-slot:licensePlate>{{ permit.licensePlate }}</template>
      </i18n-t>

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
  </Box>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
      capitalize: (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
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
    "permitNotFoundBody": "Vehicle with license plate '{licensePlate}' does not have an active area parking permit in '{zone}'. A vehicle without an active area parking permit in '{zone}' can park up to the following time limits:",
    "permitNotFoundMap": "{useMapLink} to view visitor time limits and enforcement hours in your zone.",
    "useMap": "Use the zone enforcement map",
    "permitNotFoundCaveat": "Vehicles might have other permits allowing them to park in this area, not all vehicles with a result ‘no active area parking permit found’ will be in violation. If you’d like to report this vehicle to Parking Enforcement call {callEnforcementLink}, choose option 1 to report a vehicle."
  },
  "no": {
    "permitFoundHeader": "Tillatelse funnet for '{licensePlate}'!",
    "permitNotFoundHeader": "Tillatelse ikke funnet for '{licensePlate}'.",
    "permitFoundBody": "Kjøretøy med lisens '{licensePlate}' har områdeparkeringstillatelse i '{zone}'.",
    "permitNotFoundBody": "Kjøretøy med lisens  '{licensePlate}' har ikke områdeparkeringstillatelse i '{zone}'."    
  }
}
</i18n>
