<template>
  <div class="home">
       <div class="home_finds">
      <div class="home_find" @click="back()">
        <van-icon name="search" replace to="/search" />
        <span>搜索</span>
      </div>
    </div>

    <van-tabs v-model="active" @click="switchTab">
      <van-tab
        :title="item.name"
        v-for="item in cate"
        :key="item._id"
      ></van-tab>
    </van-tabs>

    <div class="articleList" style="padding-bottom: 60px">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="到底了亲😘......"
        @load="getArticle"
        :immediate-check="false"
      >
        <!-- @load="getArticle"  是初始化好了以后自动触发一下   -->

        <template #finished>
          <div style="text-align: center; padding: 10px">
            <van-icon name="guide-o" size="30" color="red" />
          </div>
        </template>

        <template #loading>
          <div style="text-align: center; padding: 10px">
            <van-icon name="guide-o" size="30" color="red" />
          </div>
        </template>
        <li
          v-for="(item, index) in articleList"
          :key="item._id"
          @click="$router.push({ path: '/Article', query: { id: item._id } })"
        >
          <p>{{ item.title }}</p>
          <div
            :class="{
              none: item.poster_type == 1,
              articlesingleImg: item.poster_type == 2,
              articlemoreImg: item.poster_type == 3,
            }"
          >
            <img :src="img" v-for="img in item.imageSrc" />
          </div>
          <p>{{ item.time }}</p>
        </li>
      </van-list>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { Tab, Tabs, List } from "vant";

import { getCateList, getArticleList } from "@/api/home.js";

export default {
  name: "HomeView",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
  },
  data() {
    return {
      active: 0,
      cate: [],
      articleList: [], // 文章列表
      loading: false, //  是否正在加载
      finished: false, //  是否全部加载完毕
      skip: 0, //  从skip 开始拿
      limit: 20, //  一次拿多少条
    };
  },
  computed: {
    cate_id() {
      //  获取到当前被选择的分类的id
      let active_cate = this.cate[this.active];
      //  console.log(active_cate)
      if (!active_cate) return "";
      return active_cate._id;
    },
  },
  created() {
    console.log("created");
    this.getCate(); //   获取分类
  },
  //  组件被keep-alive缓存后 会多两个生命周期钩子
  //  激活后   执行的比较晚  比mounted还wan
  activated() {
    console.log("激活");
  },
  //  失活后
  deactivated() {
    console.log("失活");
  },
  methods: {
    //  切换分类
    switchTab() {
      console.log(this.active);
      this.articleList = []; //清空原来数据
      this.getArticle();
    },
    getCate() {
      getCateList().then((res) => {
        console.log(res);
        this.cate = res.data; // 第一次请求成功  他会有数据
        //  第一个接口成功  调用第二个
        this.getArticle();
      });
    },
    getArticle() {
      let { cate_id, skip, limit } = this;

      console.log("触发了上拉加载----------------------");
      getArticleList({
        cate_id,
        skip,
        limit,
      })
        .then((res) => {
          console.log(res);

          // 每次请求完 做个判断  是否全部加载完毕了 如果加载完毕了  this.finished 改成 true
          // 如果没完毕  把loading 改成 false

          setTimeout((v) => {
            this.articleList.push(...res.data);
            let len = this.articleList.length;
            let count = res.count;

            if (len >= count) {
              this.finished = true;
            } else {
              this.loading = false;
              this.skip = len; //  skip得动态的变化
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
       back() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="less" scoped>
.home_finds {
  width: 100%;
  height: 45px;
  background: #49ae44;
  padding-top: 13px;
}
.home_find {
  line-height: 35px;
  width: 60%;
  height: 35px;
  margin: auto;
  text-align: center;
  color: #ffffff;
  background: #66d79d;
  border-radius: 45px;
  font-size: 16px;
}


::v-deep .van-nav-bar__title {
  max-width: 75%;
}

::v-deep .van-tabs--line .van-tabs__wrap {
  border-bottom: 1px solid #ccc;
}
::v-deep .van-tabs__wrap--scrollable .van-tab {
  border-right: 1px solid #ccc;
}
::v-deep .van-tabs__wrap--scrollable .van-tab:last-of-type {
  border-right: 0;
}
::v-deep .van-tabs__line {
  bottom: 5.4vw;

  width: 4.66667vw;

  background-color: @color;
}
.articleList {
  overflow: hidden;
  img {
    max-width: 100%;
  }

  .none {
    display: none;
  }
  .articlemoreImg img {
    width: 200px;
    height: 150px;
  }
}
</style>
