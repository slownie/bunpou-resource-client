<script>
    import TheQuizComponent from "@/components/TheQuizComponent.vue";
    import sourceData from "@/data/jlpt.json"

    export default {
        components: {
            TheQuizComponent
        }
    }
</script>

<template>
    <h1>Test Component</h1>
    <TheQuizComponent questions="sourceData.jlpt"/>
</template>