<template>
    <div id="app">
        <login-view v-if="bool"></login-view>
        <home-com v-else></home-com>
    </div>
</template>

<script>
    import HomeCom from "./components/Home";
    import LoginView from "./views/Login";

    export default {
        name: 'app',
        data() {
            return {
                bool: true
            }
        },
        components: {
            LoginView,
            HomeCom
        }
    }
</script>

<style>
    ::-webkit-scrollbar {
        width: 13px;
        height: 13px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, .4);
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 7px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
</style>
