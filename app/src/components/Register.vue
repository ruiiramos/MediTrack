<template>
  <div class="register-container">
    <h1 class="title">Register</h1>
    <input
      class="input"
      placeholder="Name"
      v-model="name"
    />
    <input
      class="input"
      placeholder="Email"
      v-model="email"
    />
    <input
      class="input"
      placeholder="Password"
      type="password"
      v-model="password"
    />
    <button class="button" @click="handleSubmit">
      Create Account
    </button>
    <router-link :to="{ name: 'login' }" class="link">Already have an account? Login</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { REGISTER_USER } from '../api/queries';

export default {
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const name = ref('');

    const { mutate: register } = useMutation(REGISTER_USER);

    const handleSubmit = async () => {
      try {
        const response = await register({ name: name.value, email: email.value, password: password.value });
        console.log('User registered:', response.data.register);
        alert('Registration successful');
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Registration failed');
      }
    };

    return {
      email,
      password,
      name,
      handleSubmit,
    };
  },
};
</script>

<style>
body {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.button {
  width: 100%;
  padding: 15px;
  background-color: #007BFF;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.link {
  color: #007BFF;
  margin-top: 10px;
  text-decoration: none;
}
</style>