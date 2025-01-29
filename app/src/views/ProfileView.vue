<template>
  <div class="profile">
    <h2 class="title">Profile</h2>
    <h1 class="greeting">Hello, {{ userName }}</h1>

    <div class="stats-container">
      <div class="card">
        <h3 class="card-title">Total Medications</h3>
        <p class="card-value">{{ totalMedications }}</p>
      </div>
      <div class="card">
        <h3 class="card-title">Total Dosage</h3>
        <p class="card-value">{{ totalDosage }} mg</p>
      </div>
      <div class="card">
        <h3 class="card-title">Total Duration</h3>
        <p class="card-value">{{ totalDuration }} days</p>
      </div>
      <div class="card">
        <h3 class="card-title">Total Frequency</h3>
        <p class="card-value">{{ totalFrequency }} times</p>
      </div>
    </div>

    <button class="add-button" @click="navigateToMedicationScreen">Add Medication</button>

    <div class="medications-container">
      <div class="current-medications">
        <h3 class="section-title">Current Medications</h3>
        <ul class="medication-list">
          <li v-for="(medication, index) in currentMedications" :key="index" class="medication-item">
            <span class="medication-text">{{ medication.name }}</span>
            <span class="medication-text">{{ medication.dosage }}</span>
            <span class="medication-text">{{ medication.frequency }}</span>
            <span class="medication-text">{{ medication.duration }}</span>
          </li>
        </ul>
      </div>
      <div class="past-medications">
        <h3 class="section-title">Past Medications</h3>
        <ul class="medication-list">
          <li v-for="(medication, index) in pastMedications" :key="index" class="medication-item">
            <span class="medication-text">{{ medication.name }}</span>
            <span class="medication-text">{{ medication.dosage }}</span>
            <span class="medication-text">{{ medication.frequency }}</span>
            <span class="medication-text">{{ medication.duration }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useMedicationStore } from '../stores/medication.js';

export default {
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const medicationStore = useMedicationStore();

    const currentMedications = computed(() => medicationStore.currentMedications);
    const pastMedications = computed(() => medicationStore.pastMedications);

    const totalMedications = computed(() => currentMedications.value.length + pastMedications.value.length);
    const totalDosage = computed(() => {
      const currentDosage = currentMedications.value.reduce((sum, med) => sum + parseInt(med.dosage), 0);
      const pastDosage = pastMedications.value.reduce((sum, med) => sum + parseInt(med.dosage), 0);
      return currentDosage + pastDosage;
    });
    const totalDuration = computed(() => {
      const currentDuration = currentMedications.value.reduce((sum, med) => sum + parseInt(med.duration), 0);
      const pastDuration = pastMedications.value.reduce((sum, med) => sum + parseInt(med.duration), 0);
      return currentDuration + pastDuration;
    });
    const totalFrequency = computed(() => {
      const currentFrequency = currentMedications.value.reduce((sum, med) => sum + parseInt(med.frequency), 0);
      const pastFrequency = pastMedications.value.reduce((sum, med) => sum + parseInt(med.frequency), 0);
      return currentFrequency + pastFrequency;
    });

    const navigateToMedicationScreen = () => {
      this.$router.push('/medication');
    };

    return {
      currentMedications,
      pastMedications,
      totalMedications,
      totalDosage,
      totalDuration,
      totalFrequency,
      navigateToMedicationScreen,
    };
  },
};
</script>

<style scoped>
.profile {
  width: 100%;
  color: black;
}

.greeting {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: -0px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card {
  flex: 1;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 300px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.medications-container {
  display: flex;
  justify-content: space-between;
}

.current-medications,
.past-medications {
  flex: 1;
  margin: 10px;
}

.medication-list {
  list-style-type: none;
  padding: 0;
}

.medication-item {
  margin-bottom: 10px;
}

.medication-text {
  display: block;
}

.add-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>