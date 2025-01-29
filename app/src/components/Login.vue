<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <input
      class="input"
      placeholder="Username"
      v-model="username"
    />
    <input
      class="input"
      placeholder="Password"
      type="password"
      v-model="password"
    />
    <button class="button" @click="handleSubmit">
      Sign In
    </button>
    <router-link :to="{ name: 'register' }" class="link">Don't have an account? Register</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log('Username:', username.value);
      console.log('Password:', password.value);
      alert('Login attempt');
    };

    return {
      username,
      password,
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

.login-container {
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