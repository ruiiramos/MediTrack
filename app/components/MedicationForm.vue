<template>
  <div class="form-container">
    <h2 class="form-title">Medication Registration</h2>

    <label for="name">Medication Name</label>
    <span v-if="errors.name" class="error">{{ errors.name }}</span>
    <input
      type="text"
      class="form-input"
      v-model="inputFields.name"
      placeholder="Medication Name"
    />

    <label for="dosage">Dosage</label>
    <span v-if="errors.dosage" class="error">{{ errors.dosage }}</span>
    <input
      type="number"
      class="form-input"
      v-model="inputFields.dosage"
      placeholder="Dosage in mg"
      min="1"
    />

    <label for="type">Type</label>
    <span v-if="errors.type" class="error">{{ errors.type }}</span>
    <select v-model="inputFields.type" class="form-select">
      <option value="pill">Pill</option>
      <option value="syrup">Syrup</option>
      <option value="injection">Injection</option>
    </select>

    <label for="frequency">Frequency</label>
    <span v-if="errors.frequency" class="error">{{ errors.frequency }}</span>
    <input
      type="text"
      class="form-input"
      v-model="inputFields.frequency"
      placeholder="Frequency"
    />

    <label for="startDate">Start Date</label>
    <span v-if="errors.startDate" class="error">{{ errors.startDate }}</span>
    <input
      type="date"
      class="form-input"
      v-model="inputFields.startDate"
    />

    <label for="endDate">End Date</label>
    <span v-if="errors.endDate" class="error">{{ errors.endDate }}</span>
    <input
      type="date"
      class="form-input"
      v-model="inputFields.endDate"
    />

    <label for="time">Time</label>
    <span v-if="errors.time" class="error">{{ errors.time }}</span>
    <input
      type="time"
      class="form-input"
      v-model="inputFields.time"
    />

    <button class="submit-button" @click="submitForm">Add Medication</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { validateMedicationForm } from '../stores/medication.js';

export default {
  setup(props, { emit }) {
    const inputFields = ref({
      name: '',
      dosage: '',
      type: 'pill',
      frequency: '',
      startDate: '',
      endDate: '',
      time: '', 
    });

    const errors = ref({});

    const submitForm = () => {
      errors.value = validateMedicationForm(inputFields.value);
      if (Object.keys(errors.value).length === 0) {
        emit('add-medication', { ...inputFields.value });
        resetForm();
      }
    };

    const resetForm = () => {
      inputFields.value = {
        name: '',
        dosage: '',
        type: 'pill',
        frequency: '',
        startDate: '',
        endDate: '',
        time: '', 
      };
      errors.value = {};
    };

    return {
      inputFields,
      errors,
      submitForm,
    };
  },
};
</script>

<style scoped>
.form-container {
  width: 600px; 
  
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px !important;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: black;
  font-weight: bold;
}

label {
  margin: 10px 0 5px;
  font-weight: bold;
  color: black;
}

.form-input, .form-select {
  width: 100%; 
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-input:focus,
.form-select:focus {
  border-color: #007BFF;
  outline: none;
}

.submit-button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
}


</style>