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
    <li>
      <RouterLink to="/home/jlpt"> Go to JLPT Practice. </RouterLink>
    </li>
  </ul>
</template>
