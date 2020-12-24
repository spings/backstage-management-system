import Vue from 'vue'
import Vuex from 'vuex'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 标签页数组
        tabs: [{title: "首页", name: "0", content: "首页", url: "/"}],
        // 标签页数组选中
        tabActive: "",
        // 添加标签页下标
        tabIndex: 1,
        // 菜单是否被收起
        oC: false,
        // 右边界面的margin-left属性
        homeContainerLeft: -50,
        // display：none
        none: '',
        // 菜单
        menus: [],
        // 登录状态
        bool: false,
        menuBtn: []
    },
    mutations: {
        /**
         * 添加标签页方法
         * @param state
         * @param item menus对象
         */
        tabAdd(state, item) {
            // 判断是否有相同的
            let rs = this.state.tabs.filter((tab) => {
                return tab.title === item.name
            });
            // 长度大于1就是有
            if (rs.length === 1) {
                // 选中相同的标签页
                state.tabActive = rs[0].name;
            } else {
                // 没有则添加
                this.state.tabs.push({
                    title: item.name,
                    name: "" + state.tabIndex++,
                    content: item.name,
                    url: item.url
                });
                // 并选中
                state.tabActive = state.tabIndex - 1;
            }
        },
        setTabActive(state, val) {
            state.tabActive = val;
        },
        setTabIndex(state, val) {
            state.tabIndex = val;
        },
        setOC(state) {
            if (state.oC) {
                state.oC = false;
                state.homeContainerLeft = -50;
                state.none = "";
            } else {
                state.none = "none";
                setTimeout(() => {
                    state.oC = true;
                    state.homeContainerLeft = -190;
                }, 1)
            }
        },
        setMenus(state, val) {
            state.menus = val;
        },
        setBool(state, val) {
            state.bool = val;
        },
        setMenuBtn(state, val) {
            state.menuBtn= val;
        }
    },
    actions: {},
    modules: {}
})
