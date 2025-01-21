<script>
import { useUserStore } from "../stores/UserStore";
export default {
  setup() {
    const userStore = useUserStore();
    return {userStore}
  },

  methods: {
    async logout() {
        await this.userStore.logout();
    }
  }
}


</script>

<template>
  <div id="nav">
    <router-link to="/" v-if="userStore.user">Home</router-link>
    <router-link to="/" v-else>Sign Up/Login</router-link>
    <router-link to="/grammarlist">Grammar List</router-link>
    <button v-if="userStore.user" @click="logout">Logout</button>
  </div>
</template>

<style>
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 30px;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  border-bottom: 5px solid #4e6c71;
  z-index: 2;
}
#nav a {
  display: inline-block;
  margin-right: 20px;
  color: white;
  opacity: 0.7;
  transition: 0.2 ease color;
}
#nav a.router-link-active,
#nav a:hover {
  opacity: 1;
}

a {
  text-decoration: none;
  font-weight: bold;
}
</style>
