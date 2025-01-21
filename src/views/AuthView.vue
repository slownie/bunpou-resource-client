<script>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

export default {
  setup() {
    const userStore = useUserStore();
    const signupOrLogin = ref(true);
    return { userStore, signupOrLogin };
  },

  data() {
    return {
      email: "",
      password: "",
      srs: ""
    };
  },

  methods: {
    async signup() {
      await this.userStore.signup(this.email, this.password);
      return Promise.resolve().then(() => {
        localStorage.setItem("user", this.email);
      });
    },
    async login() {
      await this.userStore.login(this.email, this.password);
      return Promise.resolve().then(() => {
        localStorage.setItem("user", this.email);
      });
    },
  },
};
</script>

<template>
  <!--When project is finished, change this to only one form-->
  <div v-if="signupOrLogin === true">
    <h1>Sign Up</h1>
    <form @submit.prevent="signup" class="authform">
      <label>Email</label>
      <input type="text" v-model="email" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <div class="buttons">
        <button type="submit" class="submit-button">Sign Up</button>
        <br />
        <button
          class="change-button"
          @click="signupOrLogin = !this.signupOrLogin"
        >
          Login Instead
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <h1>Login</h1>
    <form @submit.prevent="login" class="authform">
      <label>Email</label>
      <input type="text" v-model="email" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <div class="buttons">
        <button type="submit" class="submit-button">Login</button>
        <br />
        <button
          class="change-button"
          @click="signupOrLogin = !this.signupOrLogin"
        >
          Sign Up Instead
        </button>
      </div>
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
</style>
