<template>
    <div id="menuCom">
        <el-menu
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="$store.state.oC"
                unique-opened
                router
        >
            <div class="menuHeader" :style="{display: $store.state.none}">
                后台管理系统
            </div>
            <el-menu-item
                    v-for="(submenus) in isMenus1"
                    @click="tabAdd(submenus)"
                    :index="submenus.url"
                    :key="submenus.id"
            >
                <i :class="submenus.icon"></i>
                <span slot="title">
                    {{ submenus.name }}
                </span>
            </el-menu-item>
            <el-submenu v-for="(submenus) in isMenus"
                        :key="submenus.id" :index="submenus.url"
            >
                <template slot="title">
                    <i :class="submenus.icon"></i>
                    <span slot="title">
                        {{ submenus.name }}
                    </span>
                </template>
                <el-menu-item
                        v-for="(item) in submenus.children"
                        :index="item.url"
                        :key="item.id"
                        @click="tabAdd(item)"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">
                        {{ item.name }}
                    </span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "menuCom",
        data() {
            return {
                // 菜单数组
                menus: [],
            }
        },
        methods: {
            /**
             * 添加标签页
             * @param item menu对象
             */
            tabAdd(item) {
                this.$store.commit('tabAdd', item);
            }
        },
        computed: {
            isMenus() {
                return this.menus.filter((m) => {
                    return m.children.length > 0;
                });
            },
            isMenus1() {
                return this.menus.filter((m) => {
                    return m.children.length < 1;
                });
            }
        },
        created() {
            this.$axios({
                method: 'post',
                url: 'seMenu.action',
                data: {}
            }).then((result) => {
                this.menus = result.data;
                this.$store.commit("setMenus", this.menus);
            });
        }
    }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    #menuCom > .el-menu {
        height: 100vh;
    }

    .menuHeader {
        cursor: pointer;
        color: white;
        text-align: center;
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>