<template>
<el-menu
:style="{width: !isCollapse ? '230px' : '64px'}"
    :default-active="activeMenu"
    class="aside-box dark-mode"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
  >
  <p class="title" >Duck <span v-show="!isCollapse">陪诊</span></p>
    <TreeMenu :menuData="menuData || []" index="1" />
  </el-menu>

</template>

  
<script setup>
import TreeMenu from "./treeMenu.vue";
// 为了获取到项目所有的路由信息展示到aside页，无法直接在文件间传值
// 并且，为了修改路由时aside会实时更新，应把路由信息作为响应式数据
// 之所以不直接在treeMenu上获取，是因为需要多个treeMenu实例，凡组件调用，都通过父组件传值的方式，以便子组件复用
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { useStore } from "vuex";



const router = useRouter();
// const menuData = reactive(router.options.routes[0].children)
const store = useStore()
const activeMenu = computed(() => {
  return store.state.menu.activeMenu
})
const menuData = computed(() => store.state.menu.routerList)
const isCollapse = computed(() => store.state.menu.isCollapse)

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
  border: 0;

  .title {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}

</style>
