<script>
import TheSRSComponent from "@/components/TheSRSComponent.vue";
import { useUserStore } from "@/stores/UserStore";
import sourceData from "@/data/sentences.json";

export default {
  components: {
    TheSRSComponent,
  },

  data() {
    return {
      userSentences: sourceData,
    };
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>

<template>
  <h1>SRS Practice</h1>
  <TheSRSComponent :sentenceList="userSentences.questions" />
</template>
