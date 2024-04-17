<script setup lang="ts">
import { format } from "date-fns";
import type { Travel } from "~/types/travels";

const props = defineProps<{ travels: Travel[] }>();

const emit = defineEmits<{
  deleteTravel: [value: string];
  openEditModal: [value: Travel];
}>();

const handleEdit = (travel: Travel) => emit("openEditModal", travel);
const handleDelete = (id: string) => emit("deleteTravel", id);
</script>

<template>
  <UCard class="m-3 max-w-64 text-center relative" v-for="travel in travels">
    <template #header class="relative">
      <h2 class="font-medium">{{ travel.name }}</h2>

      <UBadge
        v-if="travel.rating"
        :ui="{ rounded: 'rounded-full' }"
        class="absolute top-0 -right-2"
      >
        {{ travel.rating }}
        <UIcon name="i-heroicons-star-16-solid" />
      </UBadge>
    </template>

    <NuxtImg :src="travel.image" />

    <div class="text-left text-sm">
      <p class="mt-3">
        <span class="font-semibold">Description: </span>
        {{ travel.description }}
      </p>

      <div>
        <p>
          <span class="font-semibold">Departure Date: </span
          >{{ format(new Date(travel.departureDate), "d MMM, yyy") }}
        </p>

        <p>
          <span class="font-semibold">Arrival Date: </span
          >{{ format(new Date(travel.arrivalDate), "d MMM, yyy") }}
        </p>
      </div>

      <p>
        <span class="font-semibold">Price: </span
        >{{ priceFormat(travel.price) }}
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          @click="handleEdit(travel)"
          :padded="false"
          color="gray"
          variant="link"
          icon="i-heroicons-pencil-square"
        />

        <UButton
          @click="handleDelete(travel.id)"
          :padded="false"
          color="gray"
          variant="link"
          icon="i-heroicons-trash"
        />
      </div>
    </template>
  </UCard>
</template>
