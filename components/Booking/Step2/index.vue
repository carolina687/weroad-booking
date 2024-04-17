<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import type { FormSubmitEvent } from "#ui/types";
import { Gender, type CustomerData } from "~/types/bookings";

const emit = defineEmits<{
  next: [value: CustomerData];
  cancel: [];
}>();

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  age: undefined,
  gender: undefined,
});

const genders = [Gender.MALE, Gender.FEMALE];

const v = useVuelidate(customerRules, state);

const handleSubmit = async (event: FormSubmitEvent<CustomerData>) =>
  emit("next", event.data);

const handleCancel = () => emit("cancel");

const validateWithVuelidate = async () => {
  v.value.$touch();
  await v.value.$validate();
  return v.value.$errors.map((error) => ({
    message: error.$message,
    path: error.$propertyPath,
  }));
};
</script>

<template>
  <UForm
    :validate="validateWithVuelidate"
    :state
    class="space-y-4"
    @submit="handleSubmit"
  >
    <UFormGroup>
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Email" name="email" class="mt-3">
        <UInput
          v-model="state.email"
          placeholder="hello@weroad.com"
          type="email"
        />
      </UFormGroup>

      <UFormGroup label="Phone number" name="phone" class="mt-3">
        <UInput
          v-model="state.phone"
          type="tel"
          placeholder="(34) 234 567 890"
        />
      </UFormGroup>

      <UFormGroup label="Age" name="age" class="mt-3">
        <UInput v-model="state.age" type="number" />
      </UFormGroup>

      <UFormGroup label="Gender" name="gender" type="email" class="mt-3">
        <USelect v-model="state.gender" :options="genders" />
      </UFormGroup>
    </UFormGroup>

    <div class="flex justify-end">
      <UButton @click="handleCancel" variant="link">Cancel</UButton>

      <UButton type="submit" class="ml-3">Next Step</UButton>
    </div>
  </UForm>
</template>
