<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const signupOrLogin = ref(true); // True=Signup False=Login

const email = ref('');
const password = ref('');

async function auth() {
  // Signup
  if (signupOrLogin) {
    await userStore.signup(email.value, password.value);
  } else {
  // Login
    await userStore.login(email.value, password.value);
  }
  
}
</script>

<template>
  <!--When project is finished, change this to only one form-->
  <div>
    <h1>{{ signupOrLogin ? 'Sign Up' : 'Login' }}</h1>
    <form @submit.capture.prevent="auth" class="authform">
      <label>Email</label>
      <input type="email" v-model="email" placeholder="Email"/>
      
      <label>Password</label>
      <input type="password" v-model="password" placeholder="Password"/>

      <p v-if="userStore.error" class="error">{{ userStore.error }}</p>
      <button class="submit-button" @click.self="">{{ signupOrLogin ? 'Sign Up' : 'Login' }}</button>
      <button class="submit-button" @click.self="">{{ signupOrLogin ? 'Login Instead' : 'Sign Up Instead' }}</button>
    </form>
  </div>
</template>

<style>
label,
input {
  display: block;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

form.authform {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}

.buttons {
  align-items: center;
}

.submit-button {
  background-color: #04aa6d;
  width: 400px;
  height: 32px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.change-button {
  background-color: #04aa6d;
  width: 400px;
  height: 32px;
  border-radius: 6px;
}

.error {
  color: red;
}
</style>
