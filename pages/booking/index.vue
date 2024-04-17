<script setup lang="ts">
import { BookingCard, SharedModal, SharedNotification } from "#components";
import { ModalAction, NotificationStatus } from "~/types/shared";

const { data, refresh } = await useFetch("/api/bookings");

const displayNotification = ref(false);
const notificationStatus = ref(NotificationStatus.SUCCESS);
const notificationTitle = ref("Booking created successfully");

const modal = useModal();

const openModal = (type: string) => {
  modal.open(SharedModal, {
    type,
    onSuccessBooking() {
      modal.close();

      refresh();

      displayNotification.value = true;
    },
    onErrorBooking() {
      modal.close();

      displayNotification.value = true;
      notificationStatus.value = NotificationStatus.ERROR;
      notificationTitle.value = "Error creating a booking. Try again later.";
    },
    onCancel() {
      modal.close();
    },
  });
};

const openCreateModal = () => openModal(ModalAction.CREATE_BOOKING);

const handleCloseNotification = () => (displayNotification.value = false);
</script>

<template>
  <SharedNotification
    :title="notificationTitle"
    :status="notificationStatus"
    :onClose="handleCloseNotification"
    v-if="displayNotification"
  />

  <div>
    <div class="flex lg:justify-end justify-center">
      <UButton color="primary" variant="solid" @click="openCreateModal"
        >Book a new travel</UButton
      >
    </div>

    <div class="flex flex-wrap justify-evenly md:flex-col mt-4">
      <BookingCard :bookings="data.bookings" />
    </div>
  </div>
</template>
