<template>
    <div id="headCom">
        <div class="oC" @click="oC">
            <i v-if="sidebarDisplays" class="el-icon-s-fold" :class="oClass"></i>
        </div>

        <!-- 面包削导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="mbxHead" :class="mbxHeadAnm">
            <el-breadcrumb-item :to="{ path: '/' }" id="headSY">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in mbxItem" :key="index">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-tooltip v-if="screenBool" class="item" effect="dark" content="全屏" placement="bottom">
            <i class="el-icon-full-screen" :style="{left: screenLeft+'px'}" @click="screenFullToggle"></i>
        </el-tooltip>

        <el-tooltip v-if="refreshBool" class="item" effect="dark" content="刷新" placement="bottom">
            <i class="el-icon-refresh" :style="{left: refreshLeft+'px'}" @click="refresh($event)"></i>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="主题配置" placement="bottom">
            <i @click="drawerHead = true" :style="{left: operationLeft+'px'}" class="el-icon-s-operation"></i>
        </el-tooltip>

        <el-drawer
                title="主题配置"
                :visible.sync="drawerHead"
                size="32%"
        >
            <el-alert
                    title="主题配置可实时预览效果，更多设置请在 src/setting.js 中进行设置，建议在生产环境隐藏主题配置功能"
                    type="error"
                    :closable="false"
                    class="el-alert1"
            >
            </el-alert>
            <div class="sidebarDisplaySpan">
                <span>侧边栏切换</span>
                <span>侧边栏导航</span>
                <span>全屏</span>
                <el-alert title="该功能为页面右上角的全屏按钮" type="info" :closable="false" style="visibility: hidden">
                </el-alert>
                <el-alert
                        title="不建议开启，该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果"
                        type="warning" :closable="false" style="visibility: hidden">
                </el-alert>
                <span>页面刷新</span>
                <el-alert title="该功能为页面右上角的刷新按钮，开启时会阻止 F5 键原刷新功能，并采用框架提供的刷新模式进行页面刷新" type="info" :closable="false"
                          style="visibility: hidden">
                </el-alert>
                <span>首页</span>
                <el-alert title="控制台即欢迎页，该功能开启时，登录成功默认进入控制台；关闭时则默认进入侧边栏导航第一个导航页面" type="info" :closable="false"
                          style="visibility: hidden">
                </el-alert>
            </div>

            <div class="sidebarDisplaysBtn">
                <el-radio-group v-model="sidebarDisplays">
                    <el-radio-button :label="true">启用</el-radio-button>
                    <el-radio-button :label="false">关闭</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="oC1">
                    <el-radio-button :label="true">收起</el-radio-button>
                    <el-radio-button :label="false">展开</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="screenBool">
                    <el-radio-button :label="true">开启</el-radio-button>
                    <el-radio-button :label="false">关闭</el-radio-button>
                </el-radio-group>
                <el-alert title="该功能为页面右上角的全屏按钮" type="info" :closable="false">
                </el-alert>
                <el-alert
                        title="不建议开启，该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果"
                        type="warning" :closable="false">
                </el-alert>
                <el-radio-group v-model="refreshBool">
                    <el-radio-button :label="true">开启</el-radio-button>
                    <el-radio-button :label="false">关闭</el-radio-button>
                </el-radio-group>
                <el-alert title="该功能为页面右上角的刷新按钮，开启时会阻止 F5 键原刷新功能，并采用框架提供的刷新模式进行页面刷新" type="info" :closable="false">
                </el-alert>
                <el-radio-group v-model="homeBool">
                    <el-radio-button :label="true">开启</el-radio-button>
                    <el-radio-button :label="false">关闭</el-radio-button>
                </el-radio-group>
                <el-alert title="控制台即欢迎页，该功能开启时，登录成功默认进入控制台；关闭时则默认进入侧边栏导航第一个导航页面" type="info" :closable="false">
                </el-alert>
            </div>

        </el-drawer>

        <!-- 个人设置 -->
        <el-popover
                placement="bottom"
                width="150px"
                trigger="click">
            <ul class="settingHead">
                <li>个人设置</li>
                <li id="headLogout" @click="empUserLogout">退出登录</li>
            </ul>
            <div class="headImg" slot="reference">
                <el-avatar :src="$host+empImg"></el-avatar>
                <span class="spanHeader">{{empName}}</span>
                <i class="el-icon-caret-bottom"></i>
            </div>
        </el-popover>
        <span hidden>{{tabActive = this.$store.state.tabActive}}</span>
    </div>
</template>

<script>
    import Screenfull from 'screenfull'

    export default {
        name: "headCom",
        data() {
            return {
                oClass: "",
                tabActive: this.$store.state.tabActive,
                mbxItem: [],
                drawerHead: false,
                sidebarDisplays: true,
                mbxHeadAnm: "",
                oC1: false,
                screenLeft: 1260,
                operationLeft: 1340,
                refreshLeft: 1300,
                screenBool: false,
                refreshBool: true,
                homeBool: true,
                // 员工头像
                empImg: "",
                // 员工名字
                empName: ""
            }
        },
        methods: {
            // 导航栏缩进
            oC() {
                this.$store.commit("setOC");
                setTimeout(() => {
                    if (this.$store.state.oC) {
                        this.oClass = "aoC";
                    } else {
                        this.oClass = "aoC1";
                    }
                }, 1)
            },
            // 全屏
            screenFullToggle() {
                // 点击时判断浏览器是否可全屏,不可全屏给提示,可全屏执行screenfull.toggle()
                // 不知道为什么判断显示不可以全屏但是事实上可以全屏
                // 源代码： !Screenfull.enabled
                if (Screenfull.enabled) {
                    this.$message({
                        message: '你的浏览器不支持全屏！',
                        type: 'warning'
                    })
                    return false
                }
                Screenfull.toggle();
            },
            // 刷新当前路由
            refresh(e) {
                let url = e.path[1].baseURI.substr(e.path[1].baseURI.lastIndexOf('/'));
                this.$router.push({path: '/hc'});
                setTimeout(() => {
                    this.$router.push({path: url});
                }, 1);
            },
            // 退出登录
            empUserLogout() {
                sessionStorage.removeItem("empUser");
                this.$store.commit("setBool", false);
            },
            // 显示头像，用户名
            showImgName() {
                this.empImg = JSON.parse(localStorage.getItem("empUser")).emp.img
                this.empName = JSON.parse(localStorage.getItem("empUser")).emp.name
            }
        },
        watch: {
            tabActive(val) {
                this.mbxItem.splice(0);
                let tabs = this.$store.state.tabs;
                let tab = tabs.filter((t) => {
                    return t.name === val;
                });
                let title = "";
                if (tab[0] !== undefined) {
                    title = tab[0].title;
                }
                let menus = this.$store.state.menus;
                menus.forEach((m) => {
                    if (m.children.length < 1) {
                        if (m.name === title) {
                            this.mbxItem.push({title: title});
                        }
                    } else {
                        m.children.forEach((m1) => {
                            if (m1.name === title) {
                                this.mbxItem.push({title: m.name}, {title: title});
                            }
                        });
                    }
                });
            },
            $route(to) {
                let tabs = this.$store.state.tabs;
                tabs.forEach((t) => {
                    if (to.path === t.url) {
                        this.$store.commit("setTabActive", t.name);
                    }
                })
            },
            sidebarDisplays(val) {
                if (!val) {
                    this.mbxHeadAnm = "mbxHeadAnm";
                } else {
                    this.mbxHeadAnm = "";
                }
            },
            oC1(val) {
                if (!val) {
                    this.oC();
                } else {
                    this.oC();
                }
            },
            screenBool(val) {
                if (val) {
                    if (!this.refreshBool) {
                        this.screenLeft = 1300;
                    } else {
                        this.screenLeft = 1260;
                    }
                } else {
                    this.refreshLeft = 1300;
                }
            },
            refreshBool(val) {
                if (val) {
                    if (!this.screenBool) {
                        this.refreshLeft = 1300;
                    } else {
                        this.refreshLeft = 1260;
                    }
                } else {
                    this.screenLeft = 1300
                }
            },
        },
        created() {
            this.showImgName();
        }
    }
</script>

<style>
    #headCom {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        height: 50px;
    }

    .oC {
        width: 60px;
        height: 50px;
        cursor: pointer;
    }

    .oC:hover {
        background-image: linear-gradient(to right, #cbc9c9, white);
    }

    .oC > .el-icon-s-unfold, .el-icon-s-fold {
        font-size: 25px;
        position: relative;
        left: 10px;
        top: 11px;
    }

    .aoC {
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        transition: all 0.5s;
    }

    .aoC1 {
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transition: all 0.5s;
    }

    .headImg {
        position: absolute;
        top: 5px;
        left: 1380px;
        cursor: pointer;
    }

    .headImg > .el-icon-caret-bottom {
        font-size: 15px;
        color: dimgray;
        position: relative;
        top: -12px;
    }

    .headImg > .spanHeader {
        position: relative;
        top: -12px;
        margin-right: 7px;
        margin-left: 10px;
    }

    .settingHead {
        cursor: pointer;
    }

    .settingHead li {
        width: 100%;
        height: 30px;
        list-style-type: none;
        text-align: center;
        line-height: 30px;
    }

    .settingHead li:hover {
        background: gainsboro;
    }

    .mbxHead {
        width: 600px;
        position: relative;
        top: -33px;
        left: 56px;
    }

    .mbxHeadAnm {
        left: 16px;
        transition: left 1s;
    }

    #headSY > .el-breadcrumb__inner.is-link {
        font-weight: 700;
        text-decoration: none;
        transition: color .2s cubic-bezier(.645, .045, .355, 1);
        color: #303133;
        cursor: pointer;
    }

    #headSY > .el-breadcrumb__inner.is-link:hover {
        color: dodgerblue;
    }

    #headCom .el-icon-full-screen {
        position: absolute;
        top: 17px;
        cursor: pointer;
        font-size: 20px;
    }

    #headCom .el-icon-refresh {
        position: absolute;
        top: 17px;
        cursor: pointer;
        font-size: 22px;
    }

    #headCom .el-icon-s-operation {
        position: absolute;
        top: 17px;
        cursor: pointer;
        font-size: 22px;
    }

    #headCom .el-icon-full-screen:hover, .el-icon-refresh:hover, .el-icon-s-operation:hover {
        color: dodgerblue;
    }

    #headLogout:hover {
        background: #f56c6c;
        color: white;
    }

    #headCom .el-alert1 {
        width: 91%;
        margin-left: 20px;
    }

    .sidebarDisplaySpan {
        color: #72767b;
        /*border: 1px solid black;*/
        width: 170px;
        text-align: right;
        margin-top: 30px;
    }

    .sidebarDisplaySpan > span {
        position: relative;
        margin-top: 30px;
        display: block;
    }

    .sidebarDisplaysBtn {
        /*border: 1px solid black;*/
        position: absolute;
        top: 137px;
        left: 190px;
        width: 140px;
    }

    .sidebarDisplaysBtn .el-radio-button__inner {
        padding: 8px 15px;
        margin-top: 20px;
    }

    #headCom .el-alert.el-alert--info.is-light {
        width: 271px;
        margin-top: 10px
    }

    #headCom .el-alert.el-alert--warning.is-light {
        width: 271px;
        margin-top: 10px
    }

    /*#headCom .el-drawer.rtl {*/
    /*    overflow:auto;*/
    /*}*/
</style>