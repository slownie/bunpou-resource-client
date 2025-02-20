<script setup>
import sourceData from "@/data/jlpt.json";
import TheJLPTComponent from "@/components/TheJLPTComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const questions = sourceData[5 - route.params.id];

// Quiz Setup
</script>

<template>
  <h1>JLPT N{{ route.params.id }} Practice Quiz</h1>
  <TheJLPTComponent :question-list="questions" />
</template>

<style></style>
