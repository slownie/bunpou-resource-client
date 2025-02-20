<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <h1>Home View</h1>
  <hr />
  <ul>
    <li>
      <RouterLink to="/home/srs"> Go to SRS Practice. </RouterLink>
    </li>
    <li>
      <RouterLink to="/home/worksheet"> Go to Worksheet Practice. </RouterLink>
    </li>
    <h3>JLPT</h3>
    <li><RouterLink to="/home/jlpt/5"> N5 </RouterLink></li>
    <li><RouterLink to="/home/jlpt/4"> N4 </RouterLink></li>
    <li><RouterLink to="/home/jlpt/3"> N3 </RouterLink></li>
    <li><RouterLink to="/home/jlpt/2"> N2</RouterLink></li>
    <li><RouterLink to="/home/jlpt/1"> N1 </RouterLink></li>
  </ul>
</template>
