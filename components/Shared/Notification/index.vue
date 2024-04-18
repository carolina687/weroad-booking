<script setup lang="ts">
import { NotificationStatus } from "~/types/shared";

const props = defineProps<{ title: string; status: NotificationStatus }>();

const emit = defineEmits<{ close: [] }>();

const successStatus = props.status === NotificationStatus.SUCCESS;

const closeNotification = () => emit("close");
</script>

<template>
  <UNotification
    icon="i-heroicons-check-circle"
    :title="props.title"
    :id="1"
    class="absolute z-10 w-4/5 max-w-4xl"
    :callback="closeNotification"
    :color="successStatus ? 'primary' : 'bg-red-500'"
  />
</template>
