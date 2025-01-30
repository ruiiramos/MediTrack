<template>
  <div class="regist-meds">
    <h2 class="form-title">Registered Medications</h2>
    <ul class="registeredMedsList">
      <div v-for="(medication, index) in medications" :key="index" class="medication-item">
        <div class="medication-info">
          <strong>Name:</strong> {{ medication.name }}<br />
          <strong>Dosage:</strong> {{ medication.dosage }} mg<br />
          <strong>Type:</strong> {{ medication.type }}<br />
          <strong>Frequency:</strong> {{ medication.frequency }}<br />
          <strong>Start Date:</strong> {{ formatDate(medication.start_date) }}<br />
          <strong>End Date:</strong> {{ formatDate(medication.end_date) }}<br />
          <strong>Time:</strong> {{ formatTime(medication.start_time) }}
        </div>
        <button @click="removeMedication(index)" class="remove-button">Remove</button>
      </div>
    </ul>
    <p v-if="!loading && medications.length === 0" class="no-medications">No medications registered.</p>
    <p v-if="loading" class="loading">Loading medications...</p>
    <p v-if="error" class="error">Error loading medications: {{ error.message }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_CURRENT_MEDICATIONS } from '../api/queries';

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const medications = ref([]);
    const authToken = localStorage.getItem('authToken');

    const { result, loading, error } = useQuery(GET_CURRENT_MEDICATIONS, {
      userId: props.userId,
    }, {
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    });

    watch(result, (newResult) => {
      if (newResult && newResult.data && newResult.data.getCurrentMedications) {
        medications.value = newResult.data.getCurrentMedications;
      }
    });

    const formatDate = (date) => {
      return new Date(parseInt(date)).toLocaleDateString('pt-PT');
    };

    const formatTime = (time) => {
      return new Date(`1970-01-01T${time}`).toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const removeMedication = (index) => {
      medications.value.splice(index, 1);
    };

    return {
      medications,
      formatDate,
      formatTime,
      removeMedication,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.no-medications {
  color: black;
}

.loading {
  color: black;
}

.error {
  color: red;
}

.regist-meds {
  margin-left: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: black;
  font-weight: bold;
  width: 500px;
}

.medication-info {
  flex: 1;
  margin-right: 20px;
  width: 500px;
}

.medication-item {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.remove-button {
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.remove-button:hover {
  background-color: darkred;
}
</style>