<template>

  <div class="container">
    <div>
      <router-link to="/profile">Go to Profile</router-link>
    </div>
    <div class="form-container">
      <MedicationForm @add-medication="addMedication" />
    </div>
    <div class="list-container">
      <MedicationList :medications="medications" @remove-medication="removeMedication" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import MedicationForm from '../components/MedicationForm.vue';
import MedicationList from '../components/MedicationList.vue';

export default {
  components: {
    MedicationForm,
    MedicationList,
  },
  setup() {
    const medications = ref([]);

    const addMedication = (newMedication) => {
      medications.value.push(newMedication);
    };

    const removeMedication = (index) => {
      medications.value.splice(index, 1);
    };

    return {
      medications,
      addMedication,
      removeMedication,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between; /* Align items to space between */
  align-items: flex-start; /* Align items to the top */
  padding: 20px; /* Padding for container */
  height: 100vh; /* Ensure the container takes the full viewport height */
}

.form-container,
.list-container {
  flex: 1; /* Make both containers take equal space */
  margin: 0px; /* Add some margin between the containers */
}
</style>