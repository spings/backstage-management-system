import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/style.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$host = "http://localhost:8080/shop/img/";
axios.defaults.baseURL="http://localhost:8080/shop/"
Vue.use(ElementUI)


var vue=new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

//默认地址
vue.$router.replace({
    path: '/',
})