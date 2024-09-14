<template>
  <el-menu
    default-active="2"
    class="aside-box dark-mode"
    @open="handleOpen"
    @close="handleClose"
  >
    <p class="title">DUCK陪诊</p>
    <TreeMenu :menuData="menuData" :index="1" />
  </el-menu>

</template>

  
<script setup>
import TreeMenu from "./treeMenu.vue";
// 为了获取到项目所有的路由信息展示到aside页，无法直接在文件间传值
// 并且，为了修改路由时aside会实时更新，应把路由信息作为响应式数据
// 之所以不直接在treeMenu上获取，是因为需要多个treeMenu实例，凡组件调用，都通过父组件传值的方式，以便子组件复用
import { useRouter } from "vue-router";
import { reactive } from "vue";



const router = useRouter();
const menuData = reactive(router.options.routes[0].children)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>


<style lang="less" scoped>
.aside-box {
  height: 100%;

  .title {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
