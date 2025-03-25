<template>
  <template
    v-for="item in props.menuData"
    :key="item.name"
  >
    <el-menu-item
      @click="handleClick(item, item.meta.path)"
      v-if="!item.children || item.children.length === 0"
      :index="item.meta.path"
    >
      <el-icon size="20">
        <component :is="item.meta?.icon"></component>
      </el-icon>
      <span>{{ item.meta?.name }}</span>
    </el-menu-item>

    <el-sub-menu
      v-else
      :index="item.name"
    >
      <template #title>
        <el-icon size="20">
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.name }}</span>
      </template>
      <treeMenu
        :menuData="item.children || []"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  menuData: Array,
});
console.log('treeMenu.vue', props.menuData);

const router = useRouter();

const store = useStore();

const handleClick = (item, activeMenu) => {
  console.log('handleClick', item, activeMenu);
  if (item.meta && item.meta.path) {
    store.commit('addMenu', item.meta)
    router.push(item.meta.path);
    store.commit('changeActiveMenu', activeMenu);
  } else {
    console.error('Invalid path or meta information:', item);
  }
};
</script>

<style scoped>
/* 你的样式 */
</style>