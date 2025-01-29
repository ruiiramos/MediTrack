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
          <strong>Start Date:</strong> {{ formatDate(medication.startDate) }}<br />
          <strong>End Date:</strong> {{ formatDate(medication.endDate) }}<br />
          <strong>Time:</strong> {{ formatTime(medication.time) }}
        </div>
        <button @click="removeMedication(index)" class="remove-button">Remove</button>
    </div>
    </ul>
    <p v-if="medications.length === 0" class="no-medications">No medications registered.</p>
</div>
  </template>
  
  <script>
  export default {
    props: {
      medications: {
        type: Array,
        required: true,
      },
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString('pt-PT');
      },
      formatTime(time) {
        return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('pt-PT', {
          hour: '2-digit',
          minute: '2-digit',
        });
      },
      removeMedication(index) {
        this.$emit('remove-medication', index);
      },
    },
  };
  </script>
  
<style>

.no-medications{
    color: black;
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

.medication-info{
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

.remove-button  {
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