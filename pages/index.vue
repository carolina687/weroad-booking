<script setup lang="ts">
import { requestTravel } from "~/api/travels";
import { SharedModal, TravelsCard } from "#components";
import { RequestMethod, type Travel } from "~/types/travels";
import { ModalAction, NotificationStatus } from "~/types/shared";

const { data } = await useFetch("/api/travels");

const notificationTitle = ref("");
const travels = ref<Travel[]>(data!.value!.travels);
const notificationStatus = ref(NotificationStatus.SUCCESS);

const modal = useModal();

const openModal = (type: string, travel?: Travel) => {
  modal.open(SharedModal, {
    type,
    travel,
    onSubmitCreate(data: Travel) {
      onCreateTravel(data);

      modal.close();
    },
    onSubmitEdit(data: Travel) {
      onEditTravel(data);

      modal.close();
    },
    onCancel() {
      modal.close();
    },
  });
};

const openCreateModal = () => openModal(ModalAction.CREATE_TRAVEL);

const onOpenEditModal = (travel: Travel) =>
  openModal(ModalAction.EDIT_TRAVEL, travel);

const request = async (endpoint: any, title: string, errorMessage: string) => {
  try {
    const responseTravels = await endpoint;

    if (responseTravels) {
      notificationTitle.value = title;

      travels.value = responseTravels;
    }
  } catch (error) {
    setError(errorMessage);
  }
};

const onCreateTravel = async (data: Travel) =>
  request(
    requestTravel(RequestMethod.POST, data),
    "Travel created successfully",
    "Error creating a travel. Try again later"
  );

const onEditTravel = async (data: Travel) =>
  request(
    requestTravel(RequestMethod.PUT, data),
    "Travel edited successfully",
    "Error editing a travel. Try again later"
  );

const onDeleteTravel = async (id: string) =>
  request(
    requestTravel(RequestMethod.DELETE, id),
    "Travel deleted successfully",
    "Error deleting a travel. Try again later"
  );

const setError = (errorTitle: string) => {
  notificationTitle.value = errorTitle;
  notificationStatus.value = NotificationStatus.ERROR;
};

const filterByTravelType = (filteredTravels: Travel[]) =>
  (travels.value = filteredTravels);

const handleCloseNotification = () => (notificationTitle.value = "");
</script>

<template>
  <SharedNotification
    :title="notificationTitle"
    :status="notificationStatus"
    :onClose="handleCloseNotification"
    v-if="!!notificationTitle"
  />

  <div>
    <div class="flex md:justify-end justify-center">
      <TravelsFilter
        :onFilterFunction="filterByTravelType"
        :travels="data.travels"
      />

      <UButton
        color="primary"
        variant="solid"
        @click="openCreateModal"
        class="ml-3 md:mr-7"
      >
        Create a travel
      </UButton>
    </div>

    <div v-if="travels.length === 0">
      <UPageHeader
        title="No travels found"
        description="Create a new travel and let the experience begin"
      />
    </div>

    <div class="flex flex-wrap justify-evenly mt-5">
      <TravelsCard :travels :onDeleteTravel :onOpenEditModal />
    </div>
  </div>
</template>
