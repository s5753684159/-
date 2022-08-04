<template>
  <div id="app">

  <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
  </keep-alive>

  <router-view v-if="!$route.meta.keep"></router-view>

    <!--   需要让主页面有底部栏   -->
    <!-- 不是主页面的时候让他消失 -->

    <van-tabbar
      route
      v-model="active"
      v-if="$route.meta.isRoot"
      active-color="#b733bc"
      inactive-color="#333"
    >

     
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/publish" icon="add-o">发布</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  created(){

  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  margin: 0;
  padding: 0;
}

li{
  list-style: none;
}

.router-link-exact-active {
  color: #7442b9;
}

.tt-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.xiaoxi-icon {
  font-size: 30px;
}
</style>
