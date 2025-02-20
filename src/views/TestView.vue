<script setup>
import sourceData from "@/data/points2.json";
import { useRoute } from "vue-router";
const route = useRoute();

console.log(sourceData[route.params.id]);

</script>

<template>
    {{ sourceData[route.params.id] }}
    <ul>
        <li v-for="point in sourceData" :key="point.name">
            {{point}}
        </li>
    </ul>
</template>
