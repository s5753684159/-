import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;


import '@/components/vant-global'; //  vant全局组件


import '@/common/iconfont.js'


import mixin from '@/common/mixins'

Vue.mixin(mixin);

import init from '@/common/init';

const app =  new Vue({
  router,
  store,
  render: h => h(App)
})



init().then(res=>{
  app.$mount("#app");


}).catch(err=>{
  app.$mount("#app");
})






