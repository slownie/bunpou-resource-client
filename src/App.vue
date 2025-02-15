<script setup>
import { RouterView } from "vue-router";
import TheNavigation from "./components/TheNavigation.vue";
import TheLoadingComponent from "./components/TheLoadingComponent.vue";
import { useUserStore } from "./stores/UserStore";
const userStore = useUserStore();

</script>

<template>
  <TheLoadingComponent v-if="userStore.loading"/>
  <TheNavigation />
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  margin-top: 100px;
  background: #eee;
}

.container {
  margin: 0 auto;
  max-width: 960px;
}
</style>
