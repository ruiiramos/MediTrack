import { defineStore } from 'pinia';
import { ref } from 'vue';

export function validateMedicationForm(inputFields) {
  const errors = {};

  if (!inputFields.name || inputFields.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (inputFields.name.length < 3) {
    errors.name = 'Name is too short';
  }

  if (!inputFields.dosage) {
    errors.dosage = 'Dosage is required';
  } else if (isNaN(inputFields.dosage)) {
    errors.dosage = 'Dosage must be a number';
  } else if (inputFields.dosage < 1) {
    errors.dosage = 'Dosage must be at least 1 mg';
  }

  if (!inputFields.type) {
    errors.type = 'Type is required';
  }

  if (!inputFields.frequency || inputFields.frequency.trim() === '') {
    errors.frequency = 'Frequency is required';
  }

  if (!inputFields.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!inputFields.endDate) {
    errors.endDate = 'End date is required';
  } else if (inputFields.startDate && inputFields.endDate < inputFields.startDate) {
    errors.endDate = 'End date must be after start date';
  }

  if (!inputFields.time) {
    errors.time = 'Time is required';
  }

  return errors;
}

export const useMedicationStore = defineStore('medication', () => {
  const currentMedications = ref([]);
  const pastMedications = ref([]);

  const addMedication = (medication) => {
    currentMedications.value.push(medication);
  };

  const removeMedication = (index) => {
    currentMedications.value.splice(index, 1);
  };

  return {
    currentMedications,
    pastMedications,
    addMedication,
    removeMedication,
  };
});