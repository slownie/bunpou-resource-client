<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const userSentences = userStore.learnedSentences;
console.log(userSentences)

// Quiz Setup
const currentQuestion = ref(0);
const srsCompleted = ref();
const flipCard = ref(false);

const getCurrentCard = computed(() => {
  // Check if sentences are empty
  let card = userSentences[currentQuestion.value];
  return card;
});

const getNextQuestion = () => {
  if (currentQuestion.value < userSentences - 1) {
    currentQuestion.value++;
    flipCard.value = false;
    return;
  }
  srsCompleted.value = true;
};

const correctAnswer = () => {
  getNextQuestion();
};

const incorrectAnswer = () => {
  getNextQuestion();
};
</script>

<template>
  <h1>SRS Practice</h1>
  <main class="app">
    <section class="quiz" v-if="!srsCompleted">
      <section v-if="userSentences.length == 0">
        <h2>Your sentence deck is currently empty.</h2>
        <p>
          Go to the
          <RouterLink to="/grammarlist">Grammar List</RouterLink>
          to add some.
        </p>
      </section>

      <div class="quiz-info" v-else>
        <span class="question" v-if="!flipCard">
          {{ getCurrentCard.jpSentence }}
        </span>
        <span v-else>
          {{ getCurrentCard.jpSentence }}
          {{ getCurrentCard.enSentence }}
          {{ getCurrentCard.grammarPoint }}
        </span>

        <button v-if="!flipCard" @click="flipCard = !flipCard">
          Flip Card
        </button>
        <span v-else>
          <button @click="correctAnswer">Correct</button>
          <button @click="incorrectAnswer">Incorrect</button>
        </span>
      </div>
    </section>
    <section v-else>
      <h2>Congratulations! You have finished your SRS for today.</h2>
      <p>
        Go back to
        <RouterLink to="/home">Grammar Practice</RouterLink>.
      </p>
    </section>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100vh;
  background-color: #271c36;
  color: #fff;
}

.app h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.quiz {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
}

.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
}

.quiz-info.score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

.app button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

.app button:disabled {
  opacity: 0.5;
}

.app h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.app p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}
</style>
