<template>
  <div class="login">
    <div class="login-container">
      <div class="login-top">
        <img class="login-top_logo" src="../../assets/login_logo.png" alt="" />
        <span class="login-top_desc">NaNa-Naive 中后台前端/设计解决方案</span>
      </div>
      <n-form
        class="login-form"
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
      >
        <n-form-item path="username">
          <n-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            @keydown.enter.prevent
          >
            <template #prefix> <svg-icon :component="PersonRound" /> </template
          ></n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="loginForm.password"
            placeholder="请输入密码"
            size="large"
            type="password"
            show-password-on="click"
          >
            <template #prefix> <svg-icon :component="LockRound" /> </template
          ></n-input>
        </n-form-item>
        <n-button
          block
          size="large"
          type="primary"
          :loading="logging"
          @click="login"
        >
          登录
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { PersonRound, LockRound } from '@vicons/material'
import loading from 'naive-ui/es/_internal/loading'

const store = useStore()

const loginForm = ref({
  username: '',
  password: ''
})
const rules = ref({
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
})
const logging = ref(false)
const loginFormRef = ref(null)
const login = (e) => {
  e.preventDefault()
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      console.log('校验通过')
      logging.value = true
      store
        .dispatch('user/login', loginForm.value)
        .then(() => {
          logging.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        })
    } else {
      console.log('校验失败: ', errors)
    }
  })
}
</script>

<style lang="less" scoped>
@bg: #eee;
@dark_gray: #889aa4;
@light_gray: #eee;
@cursor: #fff;

.login {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  background-image: url(../../assets/login_bg.svg);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  .login-container {
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
    margin-top: 100px;
    .login-top {
      .login-top_logo {
        max-width: 100%;
        height: auto;
      }
      .login-top_desc {
        width: 100%;
        color: @dark_gray;
        font-size: 14px;
        text-align: center;
        display: inline-block;
      }
    }
  }
}
</style>
