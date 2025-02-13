<script setup>
import sourceData from "@/data/points.json";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const grammar = sourceData.points;
</script>

<template>
  <h2>Grammar List View</h2>
  <hr />

  <div v-if="userStore.userID">
    <h2>Your Saved Grammar Points</h2>
  </div>

  <ul>
    <li v-for="point in grammar" :key="point.id">
      <RouterLink :to="'grammarlist/' + point.id">
        {{ point.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<style></style>
