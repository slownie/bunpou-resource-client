<script setup>
import { computed } from "vue";

import TheGrammarButton from "@/components/TheGrammarButton.vue";
import sourceData from "@/data/points.json";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();

const props = defineProps({ id: Number });

const grammarPoint = computed(() => {
  return sourceData.points[props.id];
});
</script>

<template>
  <section v-if="grammarPoint" class="grammar-body">
    <div class="topbar">
      <h1>{{ grammarPoint.name }}</h1>
      <button v-if="userStore.userID" @click="addGrammarPoint">
        Add to study list
      </button>
    </div>

    <p v-if="userStore.error">{{ userStore.error }}</p>
    <!--<hr class="divider" />-->
    <div v-html="grammarPoint.desc"></div>
    <br />

    <h2>Conjugation</h2>
    <div v-html="grammarPoint.conjugation"></div>
    <br />

    <h2>Example Sentences</h2>
    <p
      v-for="sentence in grammarPoint.sentences"
      :key="sentence"
      class="sentence"
    >
      <!-- <span v-html="sentence.jp"></span>
      <br />
      <span class="eg-text">
        {{ sentence.eg }}
      </span> -->
      <TheGrammarButton
        :point="grammarPoint.name"
        :jpHTML="sentence.jpHTML"
        :jpSentence="sentence.jp"
        :egSentence="sentence.eg"
      />
    </p>
  </section>
</template>

<style>
.topbar {
  display: flex;
  justify-content: space-between;
}

.divider {
  width: 75%;
  margin-bottom: 8px;
}

.sentence {
  margin-bottom: 8px;
}

.warning-text {
  color: #cc0000;
  font-weight: bold;
}
</style>
