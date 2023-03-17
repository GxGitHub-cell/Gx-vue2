import Vue from "vue"
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import localSave from "./tools/localSave.js"
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.prototype.$localSave = localSave;
// 引入el全部组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import {msg,msgBox} from './tools/message.js'
// 封装message,使得页面只出现一个message框
Vue.prototype.$msg = msg;
// 封装messageBox
Vue.prototype.$msgBox = msgBox;
new Vue({
    store,
    router,
    render:h=>h(App)
}).$mount('#app');