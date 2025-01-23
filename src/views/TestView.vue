<script>
import TheQuizComponent from "@/components/TheQuizComponent.vue";
import sourceData from "@/data/jlpt.json";

export default {
  components: {
    TheQuizComponent,
  },

  data() {
    return {
      userQuestions: sourceData,
    };
  },
};
</script>

<template>
  <TheQuizComponent :questionList="userQuestions.questions" />
</template>
