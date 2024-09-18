<template>
<div class="header-container">
  <div class="header-left flex-box">
    <el-icon
     size="20"
      class="icon"
      @click="store.commit('collapseMenu')"
      >
      <Fold />
    </el-icon>
  </div>
  <div class="header-right">
    <el-dropdown>
    <div class="el-dropdown-link flex-box">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <p class="user-name">用户名</p>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>

</div>
  </template>
  
  <script lang="ts" setup>
  import { useStore } from 'vuex'

  const store = useStore()
  </script>
  
  <style lang="less" scoped>
  .flex-box {
    display: flex;
    align-items: conter;
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;
    .header-left {
      height: 100%;
      .icon {
        width: 45px;
        height: 100%;
      }
      .icon:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }
    .header-right {
      .user-name {
        height: 15px;
        margin: auto 10px;
        font-size: 15px;
      }
      .el-dropdown-link:hover {
        cursor: pointer;
      }
    }
  }
  </style>
  