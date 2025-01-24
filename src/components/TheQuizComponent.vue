<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({ questionList: Array });

// Quiz Setup
const currentQuestion = ref(0);
const quizCompleted = ref(false);
const score = computed(() => {
  let value = 0;
  // Setting the score
  props.questionList.map((q) => {
    if (q.selected != null && q.rightAnswer == q.selected) {
      value++;
    }
  });
  return value;
});

// Get the current question via index
const getCurrentQuestion = computed(() => {
  let question = props.questionList[currentQuestion.value];
  return question;
});

// Increment to the next question
const getNextQuestion = () => {
  if (currentQuestion.value < props.questionList.length - 1) {
    currentQuestion.value++;
    return;
  }
  quizCompleted.value = true;
};

const setAnswer = (e) => {
  console.log(e.target.value);
  getCurrentQuestion.selected = e.target.value;
  e.target.value = null;
};
</script>

<template>
  <main class="app">
    <h1>The Quiz</h1>

    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">
          {{ getCurrentQuestion.question }}
        </span>
        <span class="score">
          Score {{ score }} / {{ questionList.length }}
        </span>
      </div>
      {{ getCurrentQuestion.sentence }}

      <div class="options">
        <label
          v-for="option in getCurrentQuestion.answers"
          :class="`option ${
            getCurrentQuestion.selected === option
              ? option === getCurrentQuestion.rightAnswer
                ? 'correct'
                : 'wrong'
              : ''
          } ${
            getCurrentQuestion.selected != null &&
            option != getCurrentQuestion.selected
              ? 'disabled'
              : ''
          }`"
        >
          <input
            type="radio"
            :id="option"
            :name="option"
            :value="option"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="setAnswer"
          />
          <span> {{ option }}</span>
        </label>
      </div>

      <button @click="getNextQuestion" :disabled="!getCurrentQuestion.selected">
        {{
          getCurrentQuestion.index == props.questionList.length - 1
            ? "Finish"
            : getCurrentQuestion.selected == null
            ? "Select an option"
            : "Next question"
        }}
      </button>
    </section>
    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your score is {{ score }}/{{ props.questionList.length }}</p>
      <p>
        Go back to
        <RouterLink to="/grammarpractice">Grammar Practice</RouterLink>.
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
