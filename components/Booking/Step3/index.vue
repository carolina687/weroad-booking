<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { PaymentTypes, type Booking } from "~/types/bookings";

const emit = defineEmits<{
  submit: [value: Partial<Booking>];
  cancel: [];
}>();

const paymentTypes = [
  PaymentTypes.PAYPAL,
  PaymentTypes.REVOLUT,
  PaymentTypes.CREDIT_TRANSFER,
];

const state: Partial<Booking> = reactive({
  payment: undefined,
  notes: "",
});

const handleSubmit = async (event: FormSubmitEvent<Partial<Booking>>) =>
  emit("submit", event.data);

const handleCancel = () => emit("cancel");
</script>

<template>
  <UForm :state="state" class="space-y-4" @submit="handleSubmit">
    <UFormGroup label="Payment type" name="payment">
      <USelect
        v-model="state.payment"
        :options="paymentTypes"
        data-testid="select"
      />
    </UFormGroup>

    <UFormGroup label="Notes" name="notes">
      <UTextarea v-model="state.notes" />
    </UFormGroup>

    <div class="flex justify-end">
      <UButton @click="handleCancel" variant="link">Cancel</UButton>

      <UButton type="submit" class="ml-3" :disabled="!state.payment"
        >Submit</UButton
      >
    </div>
  </UForm>
</template>
