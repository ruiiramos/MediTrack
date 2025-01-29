<!-- filepath: /c:/Users/ruira/OneDrive/Documentos/TSIW/3º Ano/Serviços e Interfaces para a Cloud/Projeto 3/MediTrack/app/src/components/Login.vue -->
<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
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
      Sign In
    </button>
    <router-link :to="{ name: 'register' }" class="link">Don't have an account? Register</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { LOGIN_USER } from '../api/queries';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const { mutate: login } = useMutation(LOGIN_USER);

    const handleSubmit = async () => {
      try {
        const response = await login({ email: email.value, password: password.value });
        const token = response.data.login.token;
        console.log('User logged in, token:', token);
        localStorage.setItem('authToken', token); // Armazena o token no localStorage
        alert('Login successful');
        router.push({ name: 'profile' }); // Redireciona para a página de perfil
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed');
      }
    };

    return {
      email,
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