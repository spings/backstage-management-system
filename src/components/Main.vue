<template>
    <div id="mainCom">
        <el-tabs
                v-model="tabActive"
                type="card"
                closable
                @tab-remove="tabRemove"
                @contextmenu.prevent.native="openMenu($event)"
                @tab-click="tabClick"
        >
            <el-tab-pane
                    v-for="tab in tabs"
                    :key="tab.name"
                    :label="tab.title"
                    :name="tab.name"
            >
                <router-view></router-view>
            </el-tab-pane>
        </el-tabs>
        <ul
                id="contextmenu"
                v-show="visible"
                class="contextmenu"
                :style="{ top: top + 'px', left: left + 'px' }"
        >
            <li @click="closeTab">关闭</li>
            <li @click="closeOthers">关闭其他</li>
            <li @click="closeALL">关闭所有</li>
            <li @click="closeRightALL">关闭右边所有</li>
        </ul>
        <span hidden>{{this.tabActive = this.$store.state.tabActive + ""}}</span>
    </div>
</template>

<script>
    export default {
        name: "mainCom",
        data() {
            return {
                tabs: this.$store.state.tabs,
                tabActive: this.$store.state.tabActive,
                visible: false,
                left: 0,
                top: 0,
            };
        },
        methods: {
            tabRemove(targetName) {
                this.tabs.forEach((tab, index) => {
                    if (targetName === tab.name) {
                        this.tabs.splice(index, 1);
                        this.closeOpenTab(index);
                    }
                });
            },
            openMenu(e) {
                this.visible = true;
                this.left = e.clientX;
                this.top = e.clientY;
            },
            closeMenu() {
                this.visible = false;
            },
            closeTab() {
                this.close((index) => {
                    this.tabs.splice(index, 1);
                });
            },
            closeOthers() {
                this.close((index) => {
                    this.tabs.splice(index + 1);
                    this.tabs.splice(1, index - 1);
                    this.$store.commit("setTabActive", this.tabs[1].name);
                    this.$router.push({path: this.tabs[1].url});
                });
            },
            closeALL() {
                this.tabs.splice(1);
                this.$store.commit("setTabActive", 0);
                this.$router.push({path: "/"});
            },
            closeRightALL() {
                this.close((index) => {
                    this.tabs.splice(index + 1);
                });
            },
            close(func) {
                let bool = false,
                    tabActiveIndex = 0;
                this.tabs.forEach((tab, index) => {
                    if (this.tabActive === tab.name) {
                        if (tab.title !== "首页") {
                            func(index);
                            bool = true;
                            tabActiveIndex = index;
                        }
                    }
                });
                if (bool) {
                    this.closeOpenTab(tabActiveIndex);
                }
            },
            closeOpenTab(tabActiveIndex) {
                let bool = true;
                this.tabs.forEach((tab) => {
                    if (this.tabActive === tab.name) {
                        bool = false;
                    }
                });
                if (bool && this.tabs.length >= 1) {
                    if (tabActiveIndex < this.tabs.length) {
                        this.$store.commit("setTabActive", this.tabs[tabActiveIndex].name);
                        this.$router.push({path: this.tabs[tabActiveIndex].url});
                    } else {
                        this.$store.commit("setTabActive", this.tabs[tabActiveIndex - 1].name);
                        this.$router.push({path: this.tabs[tabActiveIndex - 1].url});
                    }
                }
            },
            tabClick(e) {
                let tab = this.tabs.filter((t) => {
                    return t.title === e.label;
                });
                if (e.$el.baseURI.substr(e.$el.baseURI.lastIndexOf('/')) !== tab[0].url) {
                    this.$router.push({path: tab[0].url});
                }
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    document.body.addEventListener("click", this.closeMenu);
                } else {
                    document.body.removeEventListener("click", this.closeMenu);
                }
            },
            tabActive(value) {
                this.$store.commit("setTabActive", value);
            },
            tabs(value) {
                if (value.length === 0) {
                    this.$store.commit("setTabIndex", 0);
                }
            }
        }
    }
</script>

<style>
    .contextmenu {
        position: absolute;
        z-index: 100;
        background: #fff;
        font-size: 16px;
        cursor: default;
        border: 0.5px solid gainsboro;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        opacity: 0;
        animation: a 1s;
        animation-fill-mode: forwards;
    }

    @keyframes a {
        to {
            opacity: 1;
        }
    }

    .contextmenu li {
        width: 100px;
        height: 30px;
        list-style-type: none;
        text-align: center;
        line-height: 30px;
    }

    .contextmenu li:hover {
        background: gainsboro;
    }

    .el-tabs__nav .el-tabs__item:nth-child(1) span {
        display: none;
    }
</style>