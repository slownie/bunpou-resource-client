<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import sourceData from "@/data/jlpt.json";
import TheJLPTComponent from "@/components/TheJLPTComponent.vue";

// Quiz Setup
const jlptLevel = ref(-1);
const questions = ref(sourceData[jlptLevel.value])



</script>

<template>
  <main>
    {{ questions }}
    <!--JLPT Selection-->
    <p>Please select the JLPT level you would like to test.</p>
    <div class="radio-buttons">
      <input type="radio" name="jlpt" id="n5" value=0 v-model="jlptLevel" />
      <label for="n5">N5</label>

      <input type="radio" name="jlpt" id="n4" value=1 v-model="jlptLevel" />
      <label for="n4">N4</label>

      <input type="radio" name="jlpt" id="n3" value=2 v-model="jlptLevel" />
      <label for="n3">N3</label>

      <input type="radio" name="jlpt" id="n2" value=3 v-model="jlptLevel" />
      <label for="n2">N2</label>

      <input type="radio" name="jlpt" id="n1" value=4 v-model="jlptLevel" />
      <label for="n1">N1</label>
    </div>

    <div v-if="jlptLevel.value !== null">
    </div>
  </main>
</template>

<style>
.radio-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
