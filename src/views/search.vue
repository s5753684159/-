<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        name="search"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索结果 -->
    <div class="serach-result" v-show="value.trim().length">
        <!-- <van-cell :title="item.title" v-for=""></van-cell> -->
    </div>
    <!-- 搜索历史 -->
    <div>
      
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      value: "",
      serachResult:[]
    };
  },

  mounted() {},

  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
        this.$router.push('/')
    },
  },
};
</script>

<style scoped>
::v-deep .van-search__content {
  display: flex;
  flex: 1;
  padding-left: 3.2vw;
  background-color: #f7f8fa;
  border-radius: 0.53333vw;
}
</style>