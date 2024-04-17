<script setup lang="ts">
import type { Travel } from "~/types/travels";
import { createBooking } from "~/api/bookings";
import { emptyBooking } from "~/constants/booking";
import { WizardSteps, type Booking, type CustomerData } from "~/types/bookings";

const emit = defineEmits<{
  success: [];
  error: [];
  cancel: [];
}>();

const currentStep = ref<number>(0);
const newBooking = ref<Booking>(emptyBooking);

const steps = [WizardSteps.TRAVEL, WizardSteps.PERSONAL, WizardSteps.PAYMENT];

const handleFirstStepNext = (travel: Travel) => {
  newBooking.value = { ...newBooking.value, travel };

  currentStep.value++;
};

const handleSecondStepNext = (customer: CustomerData) => {
  newBooking.value = { ...newBooking.value, customer };

  currentStep.value++;
};

const handleSubmit = async (data: Partial<Booking>) => {
  try {
    newBooking.value = { ...newBooking.value, ...data };
    const responseBookings = await createBooking(newBooking.value);

    if (responseBookings) {
      emit("success");
    }
  } catch (error) {
    emit("error");
  }
};

const handleCancel = () => emit("cancel");
</script>

<template>
  <div class="flex">
    <div v-for="(step, index) in steps">
      <UBadge
        :color="currentStep === index ? 'primary' : 'gray'"
        class="rounded-full truncate mr-2"
        size="md"
      >
        {{ index + 1 }}. {{ step }}
      </UBadge>

      <UIcon name="i-heroicons-chevron-right" class="mr-2" v-if="index !== 2" />
    </div>
  </div>

  <div class="mt-7 w-10/12">
    <BookingStep1
      :onNext="handleFirstStepNext"
      :onCancel="handleCancel"
      v-if="currentStep === 0"
    />

    <BookingStep2
      :onNext="handleSecondStepNext"
      :onCancel="handleCancel"
      v-if="currentStep === 1"
    />

    <BookingStep3
      :onSubmit="handleSubmit"
      :onCancel="handleCancel"
      v-if="currentStep === 2"
    />
  </div>
</template>
