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
        height: 100%;
        font-size: 0.28rem;
    }

    body{
        width: 100%;
        overflow: hidden;
    }
    * {
        padding: 0;
        margin: 0;
    }

    img {
        vertical-align: top;
        max-width: 100%;
    }
</style>
