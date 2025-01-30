<template>
  <div class="container">
    <div>
      <router-link to="/profile">Go to Profile</router-link>
    </div>
    <div class="form-container">
      <MedicationForm @add-medication="addMedication" />
    </div>
    <div class="list-container">
      <MedicationList :medications="medications" @remove-medication="removeMedication" :userId="userId" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { jwtDecode } from "jwt-decode";
import MedicationForm from '../components/MedicationForm.vue';
import MedicationList from '../components/MedicationList.vue';
import { ADD_MEDICATION } from '../api/queries';

export default {
  components: {
    MedicationForm,
    MedicationList,
  },
  setup() {
    const medications = ref([]);
    const userId = ref('');

    onMounted(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        userId.value = String(decodedToken.userId || '');
      }
    });

    const { mutate: addMedicationMutation } = useMutation(ADD_MEDICATION, {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    });

    const addMedication = async (newMedication) => {
      try {
        const response = await addMedicationMutation({
          input: {
            name: newMedication.name,
            dosage: newMedication.dosage,
            type: newMedication.type,
            frequency: parseInt(newMedication.frequency, 10),
            start_date: newMedication.startDate,
            end_date: newMedication.endDate,
            start_time: newMedication.time,
          },
        });
        medications.value.push(response.data.addMedication);
        alert('Medication added successfully');
      } catch (error) {
        console.error('Error adding medication:', error);
        alert('Failed to add medication');
      }
    };

    const removeMedication = (index) => {
      medications.value.splice(index, 1);
    };

    return {
      medications,
      addMedication,
      removeMedication,
      userId,
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