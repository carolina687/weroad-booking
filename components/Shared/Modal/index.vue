<script lang="ts" setup>
import { ModalAction } from "~/types/shared";
import type { Travel } from "~/types/travels";

const props = defineProps<{
  type: string;
  travel?: Travel;
}>();

const emit = defineEmits<{
  submitCreate: [value: Travel];
  submitEdit: [value: Travel];
  successBooking: [];
  errorBooking: [];
  cancel: [];
}>();

const isEditing = props.type === ModalAction.EDIT_TRAVEL;

const title = ref<string>("Create a travel");

const onSubmit = (data: Travel) => {
  !isEditing && emit("submitCreate", data);
  isEditing && emit("submitEdit", data);
};

const onSuccess = () => emit("successBooking");
const onError = () => emit("errorBooking");
const onCancel = () => emit("cancel");

switch (props.type) {
  case ModalAction.CREATE_TRAVEL:
    title.value = "Create a travel";
    break;
  case ModalAction.EDIT_TRAVEL:
    title.value = "Edit a travel";
    break;
  case ModalAction.CREATE_BOOKING:
    title.value = "New booking";
  default:
    break;
}
</script>

<template>
  <UModal prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <p>{{ title }}</p>
      </template>

      <div
        v-if="props.type === ModalAction.CREATE_BOOKING"
        class="flex flex-col items-center justify-center"
      >
        <BookingForm :onSuccess :onCancel :onError />
      </div>

      <TravelsForm :onSubmit :isEditing :onCancel :travel v-else />
    </UCard>
  </UModal>
</template>
