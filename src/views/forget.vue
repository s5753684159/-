
<template>
  <div>
    <van-nav-bar
      title="找回密码"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div>
      <van-form @submit="onSubmit" ref="forGetForm">
        <!-- 输入手机号 -->
        <van-field
          v-model="username"
          name="username"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
          ]"
        >
        </van-field>
        <!-- 输入验证码 -->
        <van-field
          v-model="vercode"
          name="vercode"
          label="验证码"
          placeholder="请输入验证码"
          clearable
          :rules="[
            { required: true, message: '请填写验证码' },
            { pattern: /^\d{6}$/, message: '验证码格式错误' },
          ]"
        >
          <!-- 发送验证码按钮 -->
          <template #button>
            <van-button
              size="mini"
              type="primary"
              native-type="button"
              @click="send"
              :disabled="disabledbtn"
              >{{ code_txt }}</van-button
            >
          </template>
        </van-field>
        <!-- 输入密码 -->
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              validator: (i) => /^\w{6,12}$/.test(i),
              message: '密码格式为6-12位数字或字母',
            },
          ]"
        >
        </van-field>

        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loadingbtn"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form } from "vant";
import { Field } from "vant";
import { sendSms, forGet } from "@/api/user";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      editingContact: {},
      username: "",
      password: "",
      vercode: "",
      disabledbtn: false,
      code_txt: "发送验证码",
      loadingbtn: false,
    };
  },
  methods: {
    // 数据检验成功
    onSubmit(values) {
      console.log("submit", values);
      this.loadingbtn = true;
      forGet(values)
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
    async send() {
      try {
        await this.$refs.forGetForm.validate("username");
        // 按钮重复禁用
        this.disabledbtn = true;
        this.code_txt = "验证码发送中...";

        let timer = null;
        let count = 10;

        // 验证码发送提示
        let res = await sendSms({
          mobile: this.username,
          type: "login",
        })
          .then((res) => {
            if (res.code == 0) {
              this.$toast(`验证码已经发送到${this.username},请注意查收`);
              // 验证码倒计时
              timer = setInterval((e) => {
                count--;
                this.code_txt = `${count}s后再次发送`;
                if (count <= 0) {
                  clearInterval(timer);
                  count = 10;
                  this.code_txt = "再次获取";
                  this.disabledbtn = false; //不可点击
                }
              }, 1000);
            } else {
              this.$toast(res.msg);
              this.disabledbtn = false;
              this.code_txt = "再次发送";
            }
          })
          .catch((err) => {
            // 提示失败 再次发送 恢复到可以点击
            this.$toast(res.msg || "网络错误");
            this.disabledbtn = false;
            this.code_txt = "再次发送";
          });
      } catch (error) {}
    },
  },
};
</script>
