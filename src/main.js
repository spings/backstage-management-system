import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/style.css'
import axios from 'axios'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$host = "http://localhost:8080/img/";
Vue.prototype.$indexOf = function (id) {
    // 判断按钮权限是否存在
    let a = 1;
    this.$store.state.menuBtn.forEach((item) => {
        if (item.id === id) {
            a = 0
        }
    });
    if (a === 0) {
        return true;
    }
    return false;
}
axios.defaults.baseURL = "http://localhost:8080/shop/"
Vue.use(ElementUI)


var vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

//默认地址
vue.$router.replace({
    path: '/',
})

/**
 * 给JS的数组对象定义一个函数，用于查询指定条件的元素
 * @param attribute
 * @param conditions
 * @returns {{size: number, row: []}} 数量, 数组对象
 */
Array.prototype.search = function (attribute, conditions) {
    let result = {row: [], size: 0}
    for (let i = 0; i < this.length; i++) {
        if (this[i][attribute] === conditions) {
            result.row.push(this[i]);
            result.size++;
        }
    }
    return result;
};