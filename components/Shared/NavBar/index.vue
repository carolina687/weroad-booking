<script setup lang="ts">
const links = [
  {
    label: "Travels",
    to: "/",
  },
  {
    label: "Booking",
    to: "/booking",
  },
];
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <img class="h-8 w-auto" src="@/assets/logo.png" alt="WeRoad logo" />
    </template>

    <template #right>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links="links" />
    </template>
  </UHeader>
</template>
