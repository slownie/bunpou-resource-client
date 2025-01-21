<script setup>
import { RouterView } from "vue-router";
import TheNavigation from "./components/TheNavigation.vue";
</script>

<template>
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
