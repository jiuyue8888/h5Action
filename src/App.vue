<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'App',

    }
</script>

<style>
    @import "animate.min.css";
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: 0.28rem;
    }

    body,.main{
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    * {
        padding: 0;
        margin: 0;
    }

    i{
        font-size: 30px;
    }
    img {
        vertical-align: top;
        max-width: 100%;
    }
</style>
