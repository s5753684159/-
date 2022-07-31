import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',  //  必填
    name: 'home',  //  选填
    component: HomeView,
    meta:{
      isRoot:true,
      keep:true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),//  懒加载   

  },
  
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/reg.vue'),//  懒加载   

  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my.vue'),
    meta:{
      isRoot:true,
      keep:true
    }   
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/publish.vue'),
    meta:{
      isRoot:true,
      keep:true
    }  
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('../views/userInfo/userinfo.vue'),
    meta:{
      keep:true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search.vue'),// 
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: () => import('../views/search/list.vue'),// 
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article/article.vue'),// 
  },
];





const router = new VueRouter({
  routes
})

export default router
