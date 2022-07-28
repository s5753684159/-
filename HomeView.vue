<template>
  <div class="home">
    <van-nav-bar>
      <template #title>
      <router-link class="home-header-search" to="/search">
      <van-icon name="search" />搜索
      </router-link>
      </template>

    </van-nav-bar>

    <div class="nav">
      <van-tabs :before-change="beforeChange">
        <van-tab v-for="item in cate" :title="item.name" :key="item.id">
        </van-tab>
      </van-tabs>
    </div>
    <div class="conten" v-for="item2 in list" :key="item2.id" @click="contentz()">
      <p>{{item2.title}}</p>
        <img :src="item2.imageSrc[0]" alt="">
        <br>
      <span>{{item2.author}}</span>
      <span>评论：{{item2.comment}}</span>
      <span>{{item2.time}}</span>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from 'vant';
import { Search } from 'vant';
import { Button } from 'vant';
import { Tab, Tabs,Icon } from 'vant';
export default {
  name: 'HomeView',
  data(){
    return{
      show:false,
      value:'',
      cate:[],
      list:[],
      author_id:''
    }
  },
  components: {
    [Button.name]:Button,
    [Search.name]:Search,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Icon.name]:Icon,
    [VanImage.name]:VanImage
  },
  created(){
    this.getCate()
    this.getlist()
  }
  ,
   methods: {
    beforeChange(index) {
      // 返回 false 表示阻止此次切换
      // if (index === 1) {
      //   return false;
      // }

      // 返回 Promise 来执行异步逻辑
      return new Promise((resolve) => {
        // 在 resolve 函数中返回 true 或 false
        resolve(index !== length-1);
      });
    },
    getCate(){
      this.$http.post('/api/get_cate_list')
      .then(res=>{
        console.log(res);
        this.cate = res.data.data
      })
    },
    getlist(){
      this.$http.post('/api/get_article_list',{
        cate_id:'610128169b33ed00018ed5df',
        skip:'0',
        limit:'20'
      })
      .then(res=>{
        console.log(res);
        this.list = res.data.data
        console.log(this.list[0].author_id);

      })
    },
    contentz(){
      // 跳转路径向history中添加一个记录
      this.$router.push({name:'article',query:{article_id:this.list[0].author_id}})
      console.log(this.author_id);
      // 跳转路径不向history中添加一个记录
      // this.$router.replace({path:'/article',})
      // 向前或向后跳转n个页面
      // this.$router.go(n)
    }
  },
}
</script>
<style scoped lang="less">
.conten{

    p{
    word-wrap:break-word;
    max-width: 375px;
    max-height: 375px;  
    }
  span{
    margin: 0 5px;
    font-size: 10px;
    color: #9B99A0;
  }
  img{
    max-width: 375px;
    max-height: 375px;
  }
}
.nav{
  white-space: nowrap;
  overflow: scroll;
}
.home-header-search{
  width: 280px;
  height: 34px;
  border-radius: 20px;
  background: #adffd6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
::v-deep .van-nav-bar__title{
 max-width: 75%;
}
::v-deep .van-tabs__nav--line.van-tabs__nav--complete {
    padding-right: 0;
    padding-left: 0;
}
::v-deep .van-tabs__wrap--scrollable .van-tab {
    border: 1px solid #ECEEF2;
}
::v-deep .van-tabs__line {
    position: absolute;
    bottom: 5vw;
    left: 0;
    z-index: 1;
    width: 4.66667vw;
    height: 0.8vw;
    background-color: #00BD55;
    border-radius: 0.8vw;
}
</style>
