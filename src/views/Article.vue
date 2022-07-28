<style lang="less" scoped>
::v-deep .van-nav-bar__content {
  background: #07c160;
}
::v-deep .van-nav-bar .van-icon {
  color: #fff;
}
::v-deep .van-nav-bar__title {
  color: #fff;
}
.txt {
  font-weight: 600;
  color: #3a3a3a;
  padding: 27px;
  padding-left: 19px;
}
#comment {
  border-radius: 5px;
  border: 1px solid rgb(176, 176, 176);
}
</style>

<template>
  <div class="Article">
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft" />
    <div class="txt">
      {{ $route.query }}
    </div>

    <van-skeleton title avatar :row="3" />
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <input type="text" name="" id="comment" placeholder="写评论" style="height:24px" />
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o">评论</van-tabbar-item>
      <van-tabbar-item icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item icon="good-job-o">点赞</van-tabbar-item>
      <van-tabbar-item icon="share-o">分享
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
    }
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
  },
};
</script>
