<script>
import TheJLPTComponent from "@/components/TheJLPTComponent.vue";
import sourceData from "@/data/jlpt.json";

export default {
  components: {
    TheJLPTComponent,
  },

  data() {
    return {
      jlptQuestions: sourceData,
    };
  },
};
</script>

<template>
  <h1>JLPT Practice</h1>
  <TheJLPTComponent />
</template>
