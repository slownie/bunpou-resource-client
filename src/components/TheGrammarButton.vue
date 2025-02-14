<script setup>
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();

const props = defineProps({
  jpHTML: String,
  point: String,
  jpSentence: String,
  egSentence: String,
});

async function addGrammarPoint() {
  await userStore.addSentence({
    jpSentence: props.jpSentence,
    jpHTML: props.jpHTML,
    egSentence: props.egSentence,
    grammarPoint: props.point,
  });
}
</script>

<template>
  <div class="button-container">
    <span v-html="jpHTML"></span>
    <br />
    <span class="eg-text">
      {{ egSentence }}
    </span>
    <br />
    <button v-if="userStore.userID" @click="addGrammarPoint">
      Add to your sentences.
    </button>
  </div>
</template>

<style>
.button-container {
  background-color: aliceblue;
  border-radius: 15%;
}
</style>
