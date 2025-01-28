<script>
import sourceData from "@/data/points.json";
import sentenceData from "@/data/sentences.json";
import { useUserStore } from "../stores/UserStore";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  props: {
    id: { type: Number, required: true },
  },

  computed: {
    grammarPoint() {
      return sourceData.points[this.id];
    },
    testSentence() {
      return sentenceData.は[0];
    },
  },

  methods: {
    async addGrammarPoint() {
      await this.userStore.addSentence(this.testSentence);
    },
  },
};
</script>

<template>
  <section v-if="grammarPoint" class="grammar-body">
    <h1>{{ grammarPoint.name }} - JLPT N{{ grammarPoint.jlptLevel }}</h1>
    <button v-if="userStore.user" @click="addGrammarPoint">
      Add to study list
    </button>
    <p v-if="userStore.error">{{ userStore.error }}</p>
    <hr class="divider" />
    <div v-html="grammarPoint.desc"></div>
    <hr class="divider" />
    <h1>Example Sentences</h1>
    <p v-for="sentence in grammarPoint.sentences" :key="sentence">
      <span v-html="sentence.jp"></span>
      <br />
      {{ sentence.eg }}
    </p>
  </section>
</template>

<style>
.divider {
  width: 75%;
}

.warning-text {
  color: red;
  font-weight: bold;
}
</style>
