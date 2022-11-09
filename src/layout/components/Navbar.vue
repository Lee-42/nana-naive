<template>
  <div class="navbar">
    <div class="breadcrumb-container">
      <Breadcrumb />
    </div>
    <div class="langselect-container">
      <LangSelect />
    </div>
    <div class="user-container">
      <UserDropDown />
    </div>
    <div class="setting-container">
      <Setting />
    </div>
  </div>
</template>

<script setup>
import UserDropDown from '@/components/UserDropdown'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import Setting from '@/components/Setting'
</script>

<style lang="less" scoped>
.navbar {
  height: 100%;
  background: silver;
  display: flex;
  align-items: center;
  position: relative;

  .breadcrumb-container {
    position: absolute;
    left: 10px;
  }

  .langselect-container {
    position: absolute;
    right: 100px;
  }

  .user-container {
    position: absolute;
    right: 50px;
  }
  .setting-container {
    position: absolute;
    right: 20px;
  }
}
</style>
