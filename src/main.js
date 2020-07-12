import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'

import App from './App'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.app = this
    }
}).$mount('#app')
