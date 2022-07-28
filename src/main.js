import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;


import '@/components/vant-global';   //  vant全局组件


import '@/common/iconfont.js'


//混入

Vue.mixin({
  data(){
    return {
      baseColor:'#07c160'
    }
  },
})

//  页面刷新 新纪元开启

// localStorage.getItem('token')



// token  去换 用户信息 

// /user/getuserInfo  




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');







