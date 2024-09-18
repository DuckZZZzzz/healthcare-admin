<template>
  <div class="common-layout">
    <el-container>
      <!-- 发现把宽度切换时的样式写在el-aside里会出现样式0.1秒的错乱，不如写在Aside内 -->
      <!-- <el-aside :style="{width: !isCollapse ? '230px' : '64px'}"> -->
        <Aside />
      <!-- </el-aside> -->
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "../components/aside.vue";
import Header from "../components/header.vue";
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;
  }
}

</style>