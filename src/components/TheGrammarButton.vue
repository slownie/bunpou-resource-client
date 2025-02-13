<script setup>
const props = defineProps({
  point: String,
  jpSentence: String,
  egSentence: String,
  userID: String,
});
</script>

<template>
  <div class="button-container">
    <span v-html="jpSentence"></span>
    <br />
    <span class="eg-text">
      {{ egSentence }}
    </span>
    <br />
    <button v-if="userID">Add to your sentences.</button>
  </div>
</template>

<style>
.button-container {
  background-color: aliceblue;
}
</style>
