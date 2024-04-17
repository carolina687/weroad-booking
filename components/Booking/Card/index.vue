<script setup lang="ts">
import type { Booking } from "~/types/bookings";

const props = defineProps<{ bookings: Booking[] }>();
</script>

<template>
  <UCard class="m-3 w-64 md:w-auto lg:mr-0" v-for="booking in bookings">
    <template #header>
      <h2 class="font-semibold">{{ booking.travel.name }}</h2>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-4">
      <div class="max-w-44 m-3">
        <NuxtImg :src="booking.travel.image" />
      </div>

      <div class="max-w-44 m-3">
        <h2 class="font-medium">Travel Details:</h2>

        <p class="">{{ booking.travel.description }}</p>
      </div>

      <div class="m-3">
        <h2 class="font-medium">Customer Details:</h2>
        <p class="">{{ booking.customer.name }}</p>

        <p class="">{{ booking.customer.email }}</p>

        <p class="">{{ `Phone: ${booking.customer.phone}` }}</p>
      </div>

      <div class="m-3">
        <h2 class="font-medium">Payment Details:</h2>

        <p class="">{{ `Payment type: ${booking.payment}` }}</p>
      </div>
    </div>

    <template #footer>
      <p class="">{{ `Notes: ${booking.notes}` }}</p>
    </template>
  </UCard>
</template>
