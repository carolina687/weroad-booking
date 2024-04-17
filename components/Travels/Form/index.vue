<script setup lang="ts">
import { format } from "date-fns";
import { useVuelidate } from "@vuelidate/core";
import type { FormSubmitEvent } from "#ui/types";
import { TravelType, type Travel } from "~/types/travels";

const props = defineProps<{
  travel?: Travel;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  submit: [value: Travel];
  cancel: [];
}>();

const form = ref();
const disabled = ref(true);
const arrivalDate = ref(new Date());
const departureDate = ref(new Date());

const editMode = props.isEditing;

const travelTypes = [TravelType.FULL, TravelType.EXPRESS, TravelType.BEACH];

const state = reactive({
  name: editMode ? props.travel?.name : undefined,
  type: editMode ? props.travel?.type : undefined,
  price: editMode ? props.travel?.price : undefined,
  image: editMode ? props.travel?.image : undefined,
  description: editMode ? props.travel?.description : undefined,
  arrivalDate: editMode ? new Date(props.travel!.arrivalDate) : arrivalDate,
  departureDate: editMode
    ? new Date(props.travel!.departureDate)
    : departureDate,
});

const v = useVuelidate(travelRules, state);

const handleSubmit = async (event: FormSubmitEvent<Travel>) =>
  emit("submit", { ...props.travel, ...event.data });

const handleCancel = () => emit("cancel");

const validateWithVuelidate = async () => {
  v.value.$touch();
  await v.value.$validate();
  return v.value.$errors.map((error) => ({
    message: error.$message,
    path: error.$propertyPath,
  }));
};

defineExpose({
  validate: async () => {
    await form.value.validate();
  },
});

const handleChange = () => (disabled.value = false);
</script>

<template>
  <UForm
    ref="form"
    :validate="validateWithVuelidate"
    :state="state"
    class="space-y-4"
    @submit="handleSubmit"
    @change="handleChange"
  >
    <UFormGroup>
      <UFormGroup label="Travel name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Travel type" name="type" class="mt-3">
        <USelect v-model="state.type" :options="travelTypes" />
      </UFormGroup>

      <UFormGroup label="Price" name="price" class="mt-3">
        <UInput v-model="state.price" type="number" placeholder="Price">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
          </template>
        </UInput>
      </UFormGroup>

      <UFormGroup label="Image URL" name="image" class="mt-3">
        <UInput
          v-model="state.image"
          type="url"
          size="sm"
          placeholder="https://example.com"
        />
      </UFormGroup>

      <div class="flex">
        <UFormGroup label="Departure date" name="departure" class="mt-3">
          <UPopover
            :popper="{ placement: 'bottom-start' }"
            @click="handleChange"
          >
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="format(new Date(state.departureDate), 'd MMM, yyy')"
            />

            <template #panel="{ close }">
              <SharedDatePicker
                v-model="state.departureDate"
                is-required
                @close="close"
                @click="handleChange"
              />
            </template>
          </UPopover>
        </UFormGroup>

        <UFormGroup label="Arrival date" name="arrival" class="mt-3 ml-3">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="format(new Date(state.arrivalDate), 'd MMM, yyy')"
            />

            <template #panel="{ close }">
              <SharedDatePicker
                v-model="state.arrivalDate"
                is-required
                @close="close"
                @click="handleChange"
                :dateDisabled="state.departureDate"
              />
            </template>
          </UPopover>
        </UFormGroup>
      </div>

      <UFormGroup label="Description" name="description" class="mt-3">
        <UTextarea
          v-model="state.description"
          placeholder="Description"
          class="mt-3"
        />
      </UFormGroup>
    </UFormGroup>

    <div class="flex justify-end">
      <UButton @click="handleCancel" variant="outline"> Cancel </UButton>
      <UButton type="submit" class="ml-3" :disabled> Submit </UButton>
    </div>
  </UForm>
</template>
