<script>
import { RouterLink } from "vue-router";
</script>

<template>
  <h1>Home View</h1>
  <hr />
  <ul>
    <li>
      <RouterLink to="/srs"> Go to SRS Practice. </RouterLink>
    </li>
    <li>
      <RouterLink to="/conjugation"> Go to Conjugation Practice. </RouterLink>
    </li>
    <li>
      <RouterLink to="/jlpt"> Go to JLPT Practice. </RouterLink>
    </li>
  </ul>
</template>
