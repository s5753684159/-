<template>
  <div>
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="旧密码"
        placeholder="旧密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            validator: (e) => /^\w{6,12}$/.test(e),
            message: '密码格式为6-12位字母或数字',
          },
        ]"
      />
       <van-field
        v-model="vercode"
        type="password"
        name="password"
        label="新密码"
        placeholder="新密码"
        :rules="[
          { required: true, message: '请再次填写密码' },
          {
            validator: (e) => /^\w{6,12}$/.test(e),
            message: '密码格式为6-12位字母或数字',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :color="baseColor"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form } from "vant";
import { Field } from "vant";
import { forget } from "@/api/user";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      username: "",
      password: "",
      vercode:""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style></style>
