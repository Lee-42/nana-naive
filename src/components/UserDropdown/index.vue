<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-avatar
      round
      src="../../assets/logo.png"
      fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const options = ref([
  {
    label: '退出登录',
    key: 'logout',
    callback: () => {
      store.dispatch('user/logout')
    }
  }
])
const handleSelect = (key, option) => {
  option.callback()
}
</script>
