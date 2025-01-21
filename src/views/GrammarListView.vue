<script>
import sourceData from "@/data/points.json";
import TheGrammarButton from "@/components/TheGrammarButton.vue";
import {useUserStore} from "../stores/UserStore";

export default {
  setup() {
    const userStore = useUserStore();
    return {userStore}
  },  

  components: {
    TheGrammarButton,
  },

  data() {
    return {
      grammar: sourceData.points,
    };
  },
};
</script>

<template>
  <h2>Grammar List View</h2>
  <hr />

  <div v-if="userStore.user !== null">
    <h2>Your Saved Grammar Points</h2>
  </div>

  <h2>N5</h2>
  <ul>
    <li v-for="point in grammar" :key="point.id">
      <RouterLink :to="'grammarlist/' + point.id">
        {{ point.name }}
      </RouterLink>
    </li>
  </ul>

  <h2>N4</h2>

  <h2>N3</h2>

  <h2>N2</h2>

  <h2>N1</h2>
</template>

<style></style>
