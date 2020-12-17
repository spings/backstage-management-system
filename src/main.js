import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/style.css'
import axios from 'axios'
import Axios from "axios";

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Axios.defaults.baseURL="http://localhost:8080/shop/"
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
