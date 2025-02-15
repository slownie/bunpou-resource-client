<template>
    <div class="loading-cover">
        <h1>Loading, please do not reload or exit.</h1>
    </div>
</template>
<style>
    .loading-cover {
        background-color: rgba(0,0,0,0.5);
        text-align: center;
        position: fixed;
        padding: 0;
        margin:0;

        top:0;
        left:0;

        width: 100%;
        height: 100%;
        z-index: 100;
    }

    .loading-cover h1 {
        color: white;
    }
</style>