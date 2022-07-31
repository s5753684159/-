<template>
  <div>
    <van-nav-bar
      title="搜索列表"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    ></van-nav-bar>

    <div class="listPage">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="getList">
          <!-- @load="getArticle"  是初始化好了以后自动触发一下   -->

          <li v-for="item in list" :key="item._id">
            <p>{{ item.title }}</p>
          </li>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { search as searchApi } from "@/api/api";

import { List, PullRefresh } from "vant";

export default {
  name: "searchList",
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      list: [],
      refreshing: false, //  是否刷新中
      loading: false, //  是否加载中
      finished: false, //  是否完成
      skip: 0,
      limit: 20,
    };
  },
  computed: {
    key_word() {
      return this.$route.query.key_word;
    },
  },
  created() {
    // this.getList()
  },
  methods: {
    onRefresh() {
      //  刷新执行的事件
      this.skip = 0;
      this.finished = false;
      this.getList(true)
    },
    getList(flag) {
      let { key_word, skip, limit } = this;
      searchApi({
        key_word,
        skip,
        limit,
      }).then((res) => {
        console.log(res);
        if (res.code == 0) {
            if(flag){
                 this.list = res.data;
                 this.refreshing = false
            }else{
                 this.list.push(...res.data);

            }
        
          let len = this.list.length;

          if (len >= res.count) {
            this.finished = true;
          } else {
            this.loading = false;
            this.skip = len;
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
.listPage{
    li{
        min-height: 100px;
    }
}

</style>
