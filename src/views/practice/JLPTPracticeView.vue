<script setup>
import sourceData from "@/data/jlpt.json";
import { ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const questions = ref(sourceData[5 - route.params.id]);

// Quiz Setup
const currentQuestion = ref(0);
const quizCompleted = ref(false);
const selected = ref('');
const score = computed(() => {
  let value = 0;
  // Setting the score
  questions.value.map((q) => {
    if (q.selected != null && q.rightAnswer == q.selected) {
      value++;
    }
  });

  // Limit the value, shouldn't happen but you never know
  if (value > questions.value.length) value = questions.value.length;
  return value;
});

// Get the current question via index
const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  console.log(question.index)
  return question;
});

// Increment to the next question
const getNextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    return;
  }
  quizCompleted.value = true;
};

const setAnswer = () => {
  if (selected.value === currentQuestion.value.rightAnswer) {
    console.log("Correct answer")
  } else {
    console.log("Wrong answer")
  }
};
</script>

<template>
  <h1>JLPT N{{ route.params.id }} Practice Quiz</h1>
  <section class="quiz" v-if="!quizCompleted">
    <div class="quiz-info">
      <span class="question">
        {{ getCurrentQuestion.question }}
      </span>
      <span class="score"> Score {{ score }} / {{ questions.length }} </span>
    </div>
    {{ getCurrentQuestion.sentence }}
    
    <div class="options">
      <label
        v-for="option in getCurrentQuestion.answers">
      <input
        type="radio"
        :id="option"
        :name="getCurrentQuestion"
        :value="option"
        v-model="selected"
        @change="setAnswer"
      />
      <span>{{ option }}</span>
      </label>
    </div>

    <button
      @="getNextQuestion"
      :disabled="!getCurrentQuestion.selected"
      >

    </button>

  </section>

  <section v-else>
    <h2>You have finished the quiz!</h2>
    <p>Your score is {{ score }}/{{ questions.length  }}</p>
      <p>
        Go back to
        <RouterLink to="/home">Grammar Practice</RouterLink>.
      </p>
  </section>
</template>

<style></style>
