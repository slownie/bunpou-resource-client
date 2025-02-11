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
    <div class="topbar">
      <h1>{{ grammarPoint.name }} - JLPT N{{ grammarPoint.jlptLevel }}</h1>
      <button v-if="userStore.user" @click="addGrammarPoint">
        Add to study list
      </button>
    </div>
    
    <p v-if="userStore.error">{{ userStore.error }}</p>
    <hr class="divider" />
    <div v-html="grammarPoint.desc"></div>
    <br/>

    <h2>Conjugation</h2>
    <div v-html="grammarPoint.conjugation"></div>
    <br/>

    <h2>Example Sentences</h2>
    <p v-for="sentence in grammarPoint.sentences" :key="sentence" class="sentence">
      <span v-html="sentence.jp"></span>
      <br />
      <span class="eg-text">
        {{ sentence.eg }}
      </span>
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
