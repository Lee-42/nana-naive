<template>
  <n-layout-sider
    class="sidebar"
    bordered
    collapse-mode="width"
    :collapsed-width="54"
    :width="210"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div class="sider-title">
      <img src="../../assets/logo.png" alt="" />
      <span v-if="!collapsed">{{ $t('msg.test') }}</span>
    </div>
    <NMenu
      :options="menus"
      :collapsed-width="54"
      :value="activeMenu"
      @update:value="clickMenuItem"
    />
  </n-layout-sider>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  filterRouters,
  generateMenus,
  generateMenusForNaive
} from '@/utils/route.js'

const router = useRouter()
const route = useRoute()

// 菜单项
const menus = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  let menus = generateMenus(filterRoutes)
  return generateMenusForNaive(menus)
})
// 选中的菜单项
const activeMenu = computed(() => {
  const { path } = route
  return path
})
// 点击菜单项
const clickMenuItem = (key, item) => {
  router.push({ path: item.path })
}
</script>

<style lang="less" scoped>
@headerHei: 46px;
.n-layout-sider {
  :deep(.n-layout-sider-scroll-container) {
    overflow: hidden !important;
  }
  :deep(.n-layout-sider-scroll-container):hover {
    overflow: overlay !important;
  }
  .sider-title {
    height: @headerHei;
    background: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: @headerHei;
    }
  }
}
</style>
