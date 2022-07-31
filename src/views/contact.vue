<!-- 联系我们 -->
<template>
  <div class="contact">
    <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  name: "contact",

  data() {
    return {
      active: 0,
    };
  },

  mounted() {},

  methods: {
    onClickLeft() {
      this.$router.push("/my");
    },
  },
};
</script>

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
</style>
