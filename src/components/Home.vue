<template>
    <div id="homeCom">
        <el-container>
            <el-aside width="250px">
                <menu-com></menu-com>
            </el-aside>

            <el-container :style="{
                marginLeft: $store.state.homeContainerLeft + 'px',
                transition: 'all 0.5s'
            }">
                <el-header>
                    <head-com></head-com>
                </el-header>
                <el-main>
                    <main-com></main-com>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import MenuCom from "./Menu";
    import MainCom from "./Main";
    import HeadCom from "./Head";

    export default {
        name: "homeCom",
        data() {
            return {
                tabs: [{title: "首页", name: "0", content: "首页"}]
            }
        },
        components: {
            HeadCom,
            MainCom,
            MenuCom,
        }
    }
</script>

<style>
    #homeCom .el-header {
        padding: 0;
    }
</style>