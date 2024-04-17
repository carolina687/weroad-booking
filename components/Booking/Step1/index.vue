<script setup lang="ts">
import type { Travel } from "~/types/travels";
import type { FormSubmitEvent } from "#ui/types";
import { emptyBooking } from "~/constants/booking";

const emit = defineEmits<{
  next: [value: Travel];
  cancel: [];
}>();

const { data } = await useFetch("/api/travels");

const selected = ref<Travel>(emptyBooking.travel);

const handleNext = async (event: FormSubmitEvent<Travel>) =>
  emit("next", selected.value);

const handleCancel = () => emit("cancel");
</script>

<template>
  <USelectMenu
    searchable
    v-model="selected"
    searchable-placeholder="Search a travel..."
    class="w-full"
    placeholder="Select a travel"
    :options="data.travels"
    option-attribute="name"
    :search-attributes="[
      'name',
      'id',
      'description',
      'price',
      'rating',
      'type',
    ]"
  >
    <template #option-empty="{ query }">
      <q>{{ query }}</q> not found
    </template>
  </USelectMenu>

  <UCard v-if="selected.name !== ''" class="mt-5">
    <template #header>
      <h2>{{ selected.name }}</h2>
    </template>

    <div>{{ `Description: ${selected.description}` }}</div>

    <UDivider orientation="horizontal" class="my-5" />

    <div class="flex justify-between">
      <div>{{ `Price: ${priceFormat(selected.price)}` }}</div>

      <div v-if="selected.rating">
        {{ `Rating: ${selected.rating}` }}
        <UIcon name="i-heroicons-star-16-solid" />
      </div>
    </div>
  </UCard>

  <div class="flex justify-end mt-5">
    <UButton @click="handleCancel" variant="outline"> Cancel </UButton>

    <UButton
      type="submit"
      class="ml-3"
      :disabled="selected.name === ''"
      @click="handleNext"
      >Next Step
    </UButton>
  </div>
</template>
