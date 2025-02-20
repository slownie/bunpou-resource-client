<script setup>
import sourceData from "@/data/jlpt.json";
import { ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const questions = ref(sourceData[5 - route.params.id]);

// Quiz Setup
const questionIndex = ref(0);
const quizCompleted = ref(false);
const selected = ref();
const score = ref(0);

// Get the current question via index
const getCurrentQuestion = computed(() => {
  let question = questions.value[questionIndex.value];
  console.log(question);
  question.index = questionIndex.value;
  return question;
});

// Increment to the next question
const getNextQuestion = () => {
  if (questionIndex.value < questions.value.length - 1) {
    questionIndex.value++;
    selected.value = undefined;
    return;
  }
  quizCompleted.value = true;
};

const setAnswer = () => {
  // console.log(selected.value);
  // console.log(getCurrentQuestion.value.rightAnswer)
  if (selected.value == getCurrentQuestion.value.rightAnswer) {
    console.log("Correct answer")
    score.value++;
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
        :name="option"
        :value="option"
        v-model="selected"
        :disabled="selected"
        @change="setAnswer"
      />
      <span>{{ option }}</span>
      </label>
    </div>

    <button
      @click="getNextQuestion"
      :disabled="!selected"
      >
      {{ 
        getCurrentQuestion.index == questions.length - 1 ? 'Finish' : !selected ? "Select an option" : "Next question"
      }}

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

<style>

</style>
