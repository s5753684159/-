<template>
  <div id="app">
    <!--   放页面的容器 -->
    <!--  带了缓存 -->

    <!-- 带了缓存以后  等于我们的被加到keep-alive中的组件 在销毁时会保存在内存中  有一个对象
    下次被显示时  不会重新创建 而是从内存中再次取出来 -->

    <!-- 有些页面不能被缓存   数据会出现错误 -->

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
      active-color="green"
      inactive-color="#333"
    >
      <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
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
  created() {
    let token = localStorage.getItem("token");
    let tokenExpired = localStorage.getItem("tokenExpired"); //  过期时间  时间戳

    if (token) {
      let now = new Date().getTime();
      if (now >= Number(tokenExpired)) {
        //  token 过期了
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpired");
        this.$toast("您的身份认证已过期,请重新登录");
        return;
      }

      //  请求接口
      this.$store.dispatch("getuserInfo", token);
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.router-link-exact-active {
  color: #42b983;
}

.tt-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
