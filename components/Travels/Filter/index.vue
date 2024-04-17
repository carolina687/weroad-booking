<script setup lang="ts">
import { TravelType, TravelTypeList, type Travel } from "~/types/travels";

const props = defineProps<{ travels: Travel[] }>();

const emit = defineEmits<{ filterFunction: [value: Travel[]] }>();

const createTravelTypes = () =>
  TravelTypeList.map((travelType) => [
    { label: travelType, click: () => filterByTravelType(travelType) },
  ]);

const filterByTravelType = (type: string) => {
  if (type === TravelType.ALL) {
    emit("filterFunction", props.travels);
  } else {
    const filteredTravels = props.travels.filter(
      (travel) => travel.type === type
    );

    emit("filterFunction", filteredTravels);
  }
};
</script>

<template>
  <div class="flex">
    <UDropdown
      :items="createTravelTypes()"
      :popper="{ placement: 'bottom-start' }"
    >
      <UButton
        color="white"
        label="Travel Types"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </div>
</template>
