<template>
    <div id="app">
        <home-com></home-com>
    </div>
</template>

<script>
    import HomeCom from "./components/Home";

    export default {
        name: 'app',
        data(){
          return {
              msg:"这里是App.vue"
          }
        },
        components: {
            HomeCom
        }
    }
</script>

<style>
</style>
