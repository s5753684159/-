<template>
  <div>
    <van-nav-bar title="修改密码" left-arrow @click-left="$router.back()"></van-nav-bar>

    <van-form @submit="onSubmit">
      <!-- <van-field
        v-model="username"
        name="username"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
        ]"
      /> -->
      <van-field v-model="oldPassword" type="oldPassword" name="oldPassword" label="旧密码" placeholder="旧密码" :rules="[
        { required: true, message: '请填写密码' },
        {
          validator: (e) => /^\w{6,12}$/.test(e),
          message: '密码格式为6-12位字母或数字',
        },
      ]" />
      <van-field v-model="newPassword" type="newPassword" name="newPassword" label="新密码" placeholder="新密码" :rules="[
        { required: true, message: '请再次填写密码' },
        {
          validator: (e) => /^\w{6,12}$/.test(e),
          message: '密码格式为6-12位字母或数字',
        },
      ]" />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" :loading="loadingbtn">确认</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form } from "vant";
import { Field } from "vant";
import { updatePwd } from "@/api/user";
import { mapState } from 'vuex';
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
  },
  computed: {
    ...mapState(['uid'])
  },
  data() {
    return {
      username: "",
      oldPassword: "",
      newPassword: "",
      loadingbtn: false,
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.loadingbtn = true;
      let { oldPassword, newPassword, uid } = this;
      updatePwd({ oldPassword, newPassword, uid })
        .then((res) => {
          // loadingbtn成功后
          console.log(res);
        })
        .finally((e) => {
          this.loadingbtn = false;
        });
      setTimeout((v) => {
        this.$router.push("login");
      }, 800);
    },
  },
};
</script>

<style>
</style>
